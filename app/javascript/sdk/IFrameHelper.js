import Cookies from 'js-cookie';
import {
  addClasses,
  loadCSS,
  removeClasses,
  onLocationChangeListener,
} from './DOMHelpers';
import {
  body,
  widgetHolder,
  createBubbleHolder,
  createBubbleIcon,
  bubbleSVG,
  chatBubble,
  closeBubble,
  bubbleHolder,
  createNotificationBubble,
  onClickChatBubble,
  onBubbleClick,
  setBubbleText,
  addUnreadClass,
  removeUnreadClass,
} from './bubbleHelpers';
import { isWidgetColorLighter } from 'shared/helpers/colorHelper';
import { dispatchWindowEvent } from 'shared/helpers/CustomEventHelper';
import {
  EVOCHAT_ERROR,
  EVOCHAT_ON_MESSAGE,
  EVOCHAT_READY,
} from '../widget/constants/sdkEvents';
import { SET_USER_ERROR } from '../widget/constants/errorTypes';
import { getUserCookieName } from './cookieHelpers';
import {
  getAlertAudio,
  initOnEvents,
} from 'shared/helpers/AudioNotificationHelper';
import { isFlatWidgetStyle } from './settingsHelper';
import { popoutChatWindow } from '../widget/helpers/popoutHelper';

const updateAuthCookie = cookieContent =>
  Cookies.set('cw_conversation', cookieContent, {
    expires: 365,
    sameSite: 'Lax',
  });

export const IFrameHelper = {
  getUrl({ baseUrl, websiteToken }) {
    return `${baseUrl}/widget?website_token=${websiteToken}`;
  },
  createFrame: ({ baseUrl, websiteToken }) => {
    if (IFrameHelper.getAppFrame()) {
      return;
    }

    loadCSS();
    const iframe = document.createElement('iframe');
    const cwCookie = Cookies.get('cw_conversation');
    let widgetUrl = IFrameHelper.getUrl({ baseUrl, websiteToken });
    if (cwCookie) {
      widgetUrl = `${widgetUrl}&cw_conversation=${cwCookie}`;
    }
    iframe.src = widgetUrl;
    iframe.allow =
      'camera;microphone;fullscreen;display-capture;picture-in-picture;clipboard-write;';
    iframe.id = 'evochat_live_chat_widget';
    iframe.style.visibility = 'hidden';

    let holderClassName = `evo-widget-holder evo--hide evo-elements--${window.$evochat.position}`;
    if (window.$evochat.hideMessageBubble) {
      holderClassName += ` evo-widget--without-bubble`;
    }
    if (isFlatWidgetStyle(window.$evochat.widgetStyle)) {
      holderClassName += ` evo-widget-holder--flat`;
    }

    addClasses(widgetHolder, holderClassName);
    widgetHolder.appendChild(iframe);
    body.appendChild(widgetHolder);
    IFrameHelper.initPostMessageCommunication();
    IFrameHelper.initWindowSizeListener();
    IFrameHelper.preventDefaultScroll();
  },
  getAppFrame: () => document.getElementById('evochat_live_chat_widget'),
  getBubbleHolder: () => document.getElementsByClassName('evo--bubble-holder'),
  sendMessage: (key, value) => {
    const element = IFrameHelper.getAppFrame();
    element.contentWindow.postMessage(
      `evochat-widget:${JSON.stringify({ event: key, ...value })}`,
      '*'
    );
  },
  initPostMessageCommunication: () => {
    window.onmessage = e => {
      if (
        typeof e.data !== 'string' ||
        e.data.indexOf('evochat-widget:') !== 0
      ) {
        return;
      }
      const message = JSON.parse(e.data.replace('evochat-widget:', ''));
      if (typeof IFrameHelper.events[message.event] === 'function') {
        IFrameHelper.events[message.event](message);
      }
    };
  },
  initWindowSizeListener: () => {
    window.addEventListener('resize', () => IFrameHelper.toggleCloseButton());
  },
  preventDefaultScroll: () => {
    widgetHolder.addEventListener('wheel', event => {
      const deltaY = event.deltaY;
      const contentHeight = widgetHolder.scrollHeight;
      const visibleHeight = widgetHolder.offsetHeight;
      const scrollTop = widgetHolder.scrollTop;

      if (
        (scrollTop === 0 && deltaY < 0) ||
        (visibleHeight + scrollTop === contentHeight && deltaY > 0)
      ) {
        event.preventDefault();
      }
    });
  },

  setFrameHeightToFitContent: (extraHeight, isFixedHeight) => {
    const iframe = IFrameHelper.getAppFrame();
    const updatedIframeHeight = isFixedHeight ? `${extraHeight}px` : '100%';

    if (iframe)
      iframe.setAttribute('style', `height: ${updatedIframeHeight} !important`);
  },

  setupAudioListeners: () => {
    const { baseUrl = '' } = window.$evochat;
    getAlertAudio(baseUrl, { type: 'widget', alertTone: 'ding' }).then(() =>
      initOnEvents.forEach(event => {
        document.removeEventListener(
          event,
          IFrameHelper.setupAudioListeners,
          false
        );
      })
    );
  },

  events: {
    loaded: message => {
      updateAuthCookie(message.config.authToken);
      window.$evochat.hasLoaded = true;
      IFrameHelper.sendMessage('config-set', {
        locale: window.$evochat.locale,
        position: window.$evochat.position,
        hideMessageBubble: window.$evochat.hideMessageBubble,
        showPopoutButton: window.$evochat.showPopoutButton,
        widgetStyle: window.$evochat.widgetStyle,
        darkMode: window.$evochat.darkMode,
      });
      IFrameHelper.onLoad({
        widgetColor: message.config.channelConfig.widgetColor,
      });
      IFrameHelper.toggleCloseButton();

      if (window.$evochat.user) {
        IFrameHelper.sendMessage('set-user', window.$evochat.user);
      }

      window.playAudioAlert = () => {};

      initOnEvents.forEach(e => {
        document.addEventListener(e, IFrameHelper.setupAudioListeners, false);
      });

      if (!window.$evochat.resetTriggered) {
        dispatchWindowEvent({ eventName: EVOCHAT_READY });
      }
    },
    error: ({ errorType, data }) => {
      dispatchWindowEvent({ eventName: EVOCHAT_ERROR, data: data });

      if (errorType === SET_USER_ERROR) {
        Cookies.remove(getUserCookieName());
      }
    },
    onMessage({ data }) {
      dispatchWindowEvent({ eventName: EVOCHAT_ON_MESSAGE, data });
    },
    setBubbleLabel(message) {
      setBubbleText(window.$evochat.launcherTitle || message.label);
    },

    setAuthCookie({ data: { widgetAuthToken } }) {
      updateAuthCookie(widgetAuthToken);
    },

    toggleBubble: state => {
      let bubbleState = {};
      if (state === 'open') {
        bubbleState.toggleValue = true;
      } else if (state === 'close') {
        bubbleState.toggleValue = false;
      }

      onBubbleClick(bubbleState);
    },

    popoutChatWindow: ({ baseUrl, websiteToken, locale }) => {
      const cwCookie = Cookies.get('cw_conversation');
      window.$evochat.toggle('close');
      popoutChatWindow(baseUrl, websiteToken, locale, cwCookie);
    },

    closeWindow: () => {
      onBubbleClick({ toggleValue: false });
      removeUnreadClass();
    },

    onBubbleToggle: isOpen => {
      IFrameHelper.sendMessage('toggle-open', { isOpen });
      if (isOpen) {
        IFrameHelper.pushEvent('webwidget.triggered');
      }
    },
    onLocationChange: ({ referrerURL, referrerHost }) => {
      IFrameHelper.sendMessage('change-url', {
        referrerURL,
        referrerHost,
      });
    },
    updateIframeHeight: message => {
      const { extraHeight = 0, isFixedHeight } = message;

      IFrameHelper.setFrameHeightToFitContent(extraHeight, isFixedHeight);
    },

    setUnreadMode: () => {
      addUnreadClass();
      onBubbleClick({ toggleValue: true });
    },

    resetUnreadMode: () => removeUnreadClass(),
    handleNotificationDot: event => {
      if (window.$evochat.hideMessageBubble) {
        return;
      }

      const bubbleElement = document.querySelector('.evo-widget-bubble');
      if (
        event.unreadMessageCount > 0 &&
        !bubbleElement.classList.contains('unread-notification')
      ) {
        addClasses(bubbleElement, 'unread-notification');
      } else if (event.unreadMessageCount === 0) {
        removeClasses(bubbleElement, 'unread-notification');
      }
    },

    closeChat: () => {
      onBubbleClick({ toggleValue: false });
    },

    playAudio: () => {
      window.playAudioAlert();
    },
  },
  pushEvent: eventName => {
    IFrameHelper.sendMessage('push-event', { eventName });
  },

  onLoad: ({ widgetColor }) => {
    const iframe = IFrameHelper.getAppFrame();
    iframe.style.visibility = '';
    iframe.setAttribute('id', `evochat_live_chat_widget`);

    if (IFrameHelper.getBubbleHolder().length) {
      return;
    }
    createBubbleHolder(window.$evochat.hideMessageBubble);
    onLocationChangeListener();

    let className = 'evo-widget-bubble';
    let closeBtnClassName = `evo-elements--${window.$evochat.position} evo-widget-bubble evo--close evo--hide`;

    if (isFlatWidgetStyle(window.$evochat.widgetStyle)) {
      className += ' evo-widget-bubble--flat';
      closeBtnClassName += ' evo-widget-bubble--flat';
    }

    if (isWidgetColorLighter(widgetColor)) {
      className += ' evo-widget-bubble-color--lighter';
      closeBtnClassName += ' evo-widget-bubble-color--lighter';
    }

    const chatIcon = createBubbleIcon({
      className,
      path: bubbleSVG,
      target: chatBubble,
    });

    addClasses(closeBubble, closeBtnClassName);

    chatIcon.style.background = widgetColor;
    closeBubble.style.background = widgetColor;

    bubbleHolder.appendChild(chatIcon);
    bubbleHolder.appendChild(closeBubble);
    bubbleHolder.appendChild(createNotificationBubble());
    onClickChatBubble();
  },
  toggleCloseButton: () => {
    let isMobile = false;
    if (window.matchMedia('(max-width: 668px)').matches) {
      isMobile = true;
    }
    IFrameHelper.sendMessage('toggle-close-button', { isMobile });
  },
};

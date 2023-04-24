import Cookies from 'js-cookie';
import { IFrameHelper } from '../sdk/IFrameHelper';
import {
  getBubbleView,
  getDarkMode,
  getWidgetStyle,
} from '../sdk/settingsHelper';
import {
  computeHashForUserData,
  getUserCookieName,
  hasUserKeys,
} from '../sdk/cookieHelpers';
import { addClasses, removeClasses } from '../sdk/DOMHelpers';
import { SDK_SET_BUBBLE_VISIBILITY } from 'shared/constants/sharedFrameEvents';
const runSDK = ({ baseUrl, websiteToken }) => {
  if (window.$evochat) {
    return;
  }

  const evochatSettings = window.evochatSettings || {};
  let locale = evochatSettings.locale;

  if (evochatSettings.useBrowserLanguage) {
    locale = window.navigator.language.replace('-', '_');
  }

  window.$evochat = {
    baseUrl,
    hasLoaded: false,
    hideMessageBubble: evochatSettings.hideMessageBubble || false,
    isOpen: false,
    position: evochatSettings.position === 'left' ? 'left' : 'right',
    websiteToken,
    locale,
    useBrowserLanguage: evochatSettings.useBrowserLanguage || false,
    type: getBubbleView(evochatSettings.type),
    launcherTitle: evochatSettings.launcherTitle || '',
    showPopoutButton: evochatSettings.showPopoutButton || false,
    widgetStyle: getWidgetStyle(evochatSettings.widgetStyle) || 'standard',
    resetTriggered: false,
    darkMode: getDarkMode(evochatSettings.darkMode),

    toggle(state) {
      IFrameHelper.events.toggleBubble(state);
    },

    toggleBubbleVisibility(visibility) {
      let widgetElm = document.querySelector('.evo--bubble-holder');
      let widgetHolder = document.querySelector('.evo-widget-holder');
      if (visibility === 'hide') {
        addClasses(widgetHolder, 'evo-widget--without-bubble');
        addClasses(widgetElm, 'evo-hidden');
        window.$evochat.hideMessageBubble = true;
      } else if (visibility === 'show') {
        removeClasses(widgetElm, 'evo-hidden');
        removeClasses(widgetHolder, 'evo-widget--without-bubble');
        window.$evochat.hideMessageBubble = false;
      }
      IFrameHelper.sendMessage(SDK_SET_BUBBLE_VISIBILITY, {
        hideMessageBubble: window.$evochat.hideMessageBubble,
      });
    },

    popoutChatWindow() {
      IFrameHelper.events.popoutChatWindow({
        baseUrl: window.$evochat.baseUrl,
        websiteToken: window.$evochat.websiteToken,
        locale,
      });
    },

    setUser(identifier, user) {
      if (typeof identifier !== 'string' && typeof identifier !== 'number') {
        throw new Error('Identifier should be a string or a number');
      }

      if (!hasUserKeys(user)) {
        throw new Error(
          'User object should have one of the keys [avatar_url, email, name]'
        );
      }

      const userCookieName = getUserCookieName();
      const existingCookieValue = Cookies.get(userCookieName);
      const hashToBeStored = computeHashForUserData({ identifier, user });
      if (hashToBeStored === existingCookieValue) {
        return;
      }

      window.$evochat.identifier = identifier;
      window.$evochat.user = user;
      IFrameHelper.sendMessage('set-user', { identifier, user });
      Cookies.set(userCookieName, hashToBeStored, {
        expires: 365,
        sameSite: 'Lax',
      });
    },

    setCustomAttributes(customAttributes = {}) {
      if (!customAttributes || !Object.keys(customAttributes).length) {
        throw new Error('Custom attributes should have atleast one key');
      } else {
        IFrameHelper.sendMessage('set-custom-attributes', { customAttributes });
      }
    },

    deleteCustomAttribute(customAttribute = '') {
      if (!customAttribute) {
        throw new Error('Custom attribute is required');
      } else {
        IFrameHelper.sendMessage('delete-custom-attribute', {
          customAttribute,
        });
      }
    },

    setConversationCustomAttributes(customAttributes = {}) {
      if (!customAttributes || !Object.keys(customAttributes).length) {
        throw new Error('Custom attributes should have atleast one key');
      } else {
        IFrameHelper.sendMessage('set-conversation-custom-attributes', {
          customAttributes,
        });
      }
    },

    deleteConversationCustomAttribute(customAttribute = '') {
      if (!customAttribute) {
        throw new Error('Custom attribute is required');
      } else {
        IFrameHelper.sendMessage('delete-conversation-custom-attribute', {
          customAttribute,
        });
      }
    },

    setLabel(label = '') {
      IFrameHelper.sendMessage('set-label', { label });
    },

    removeLabel(label = '') {
      IFrameHelper.sendMessage('remove-label', { label });
    },

    setLocale(localeToBeUsed = 'en') {
      IFrameHelper.sendMessage('set-locale', { locale: localeToBeUsed });
    },

    reset() {
      if (window.$evochat.isOpen) {
        IFrameHelper.events.toggleBubble();
      }

      Cookies.remove('cw_conversation');
      Cookies.remove(getUserCookieName());

      const iframe = IFrameHelper.getAppFrame();
      iframe.src = IFrameHelper.getUrl({
        baseUrl: window.$evochat.baseUrl,
        websiteToken: window.$evochat.websiteToken,
      });

      window.$evochat.resetTriggered = true;
    },
  };

  IFrameHelper.createFrame({
    baseUrl,
    websiteToken,
  });
};

window.evochatSDK = {
  run: runSDK,
};

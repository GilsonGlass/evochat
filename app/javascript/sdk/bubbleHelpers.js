import { addClasses, removeClasses, toggleClass } from './DOMHelpers';
import { IFrameHelper } from './IFrameHelper';
import { isExpandedView } from './settingsHelper';

export const bubbleSVG =
  'M240.808 240.808H122.123C56.6994 240.808 3.45695 187.562 3.45695 122.122C3.45695 56.7031 56.6994 3.45697 122.124 3.45697C187.566 3.45697 240.808 56.7031 240.808 122.122V240.808Z';

export const body = document.getElementsByTagName('body')[0];
export const widgetHolder = document.createElement('div');

export const bubbleHolder = document.createElement('div');
export const chatBubble = document.createElement('button');
export const closeBubble = document.createElement('button');
export const notificationBubble = document.createElement('span');

export const setBubbleText = bubbleText => {
  if (isExpandedView(window.$evochat.type)) {
    const textNode = document.getElementById('evo-widget--expanded__text');
    textNode.innerText = bubbleText;
  }
};

export const createBubbleIcon = ({ className, path, target }) => {
  let bubbleClassName = `${className} evo-elements--${window.$evochat.position}`;
  const bubbleIcon = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg'
  );
  bubbleIcon.setAttributeNS(null, 'id', 'evo-widget-bubble-icon');
  bubbleIcon.setAttributeNS(null, 'width', '24');
  bubbleIcon.setAttributeNS(null, 'height', '24');
  bubbleIcon.setAttributeNS(null, 'viewBox', '0 0 240 240');
  bubbleIcon.setAttributeNS(null, 'fill', 'none');
  bubbleIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

  const bubblePath = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'path'
  );
  bubblePath.setAttributeNS(null, 'd', path);
  bubblePath.setAttributeNS(null, 'fill', '#FFFFFF');

  bubbleIcon.appendChild(bubblePath);
  target.appendChild(bubbleIcon);

  if (isExpandedView(window.$evochat.type)) {
    const textNode = document.createElement('div');
    textNode.id = 'evo-widget--expanded__text';
    textNode.innerText = '';
    target.appendChild(textNode);
    bubbleClassName += ' evo-widget--expanded';
  }

  target.className = bubbleClassName;
  target.title = 'Open chat window';
  return target;
};

export const createBubbleHolder = hideMessageBubble => {
  if (hideMessageBubble) {
    addClasses(bubbleHolder, 'evo-hidden');
  }
  addClasses(bubbleHolder, 'evo--bubble-holder');
  body.appendChild(bubbleHolder);
};

export const createNotificationBubble = () => {
  addClasses(notificationBubble, 'evo--notification');
  return notificationBubble;
};

export const onBubbleClick = (props = {}) => {
  const { toggleValue } = props;
  const { isOpen } = window.$evochat;
  if (isOpen !== toggleValue) {
    const newIsOpen = toggleValue === undefined ? !isOpen : toggleValue;
    window.$evochat.isOpen = newIsOpen;

    toggleClass(chatBubble, 'evo--hide');
    toggleClass(closeBubble, 'evo--hide');
    toggleClass(widgetHolder, 'evo--hide');
    IFrameHelper.events.onBubbleToggle(newIsOpen);

    if (!newIsOpen) {
      chatBubble.focus();
    }
  }
};

export const onClickChatBubble = () => {
  bubbleHolder.addEventListener('click', onBubbleClick);
};

export const addUnreadClass = () => {
  const holderEl = document.querySelector('.evo-widget-holder');
  addClasses(holderEl, 'has-unread-view');
};

export const removeUnreadClass = () => {
  const holderEl = document.querySelector('.evo-widget-holder');
  removeClasses(holderEl, 'has-unread-view');
};

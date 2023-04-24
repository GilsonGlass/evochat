export const SDK_CSS = `
:root {
  --b-100: #F2F3F7;
  --s-700: #37546D;
}

.evo-widget-holder {
  box-shadow: 0 5px 40px rgba(0, 0, 0, .16);
  opacity: 1;
  will-change: transform, opacity;
  transform: translateY(0);
  overflow: hidden !important;
  position: fixed !important;
  transition: opacity 0.2s linear, transform 0.25s linear;
  z-index: 2147483000 !important;
}

.evo-widget-holder.evo-widget-holder--flat {
  box-shadow: none;
  border-radius: 0;
  border: 1px solid var(--b-100);
}

.evo-widget-holder iframe {
  border: 0;
  height: 100% !important;
  width: 100% !important;
  max-height: 100vh !important;
}

.evo-widget-holder.has-unread-view {
  border-radius: 0 !important;
  min-height: 80px !important;
  height: auto;
  bottom: 94px;
  box-shadow: none !important;
  border: 0;
}

.evo-widget-bubble {
  background: #1f93ff;
  border-radius: 100px;
  border-width: 0px;
  bottom: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, .16) !important;
  cursor: pointer;
  height: 64px;
  padding: 0px;
  position: fixed;
  user-select: none;
  width: 64px;
  z-index: 2147483000 !important;
}

.evo-widget-bubble.evo-widget-bubble--flat {
  border-radius: 0;
}

.evo-widget-holder.evo-widget-holder--flat {
  bottom: 90px;
}

.evo-widget-bubble.evo-widget-bubble--flat {
  height: 56px;
  width: 56px;
}

.evo-widget-bubble.evo-widget-bubble--flat svg {
  margin: 16px;
}

.evo-widget-bubble.evo-widget-bubble--flat.evo--close::before,
.evo-widget-bubble.evo-widget-bubble--flat.evo--close::after {
  left: 28px;
  top: 16px;
}

.evo-widget-bubble.unread-notification::after {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  background: #ff4040;
  border-radius: 100%;
  top: 0px;
  right: 0px;
  border: 2px solid #ffffff;
  transition: background 0.2s ease;
}

.evo-widget-bubble.evo-widget--expanded {
  bottom: 24px;
  display: flex;
  height: 48px !important;
  width: auto !important;
  align-items: center;
}

.evo-widget-bubble.evo-widget--expanded div {
  align-items: center;
  color: #fff;
  display: flex;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen-Sans, Ubuntu, Cantarell, Helvetica Neue, Arial, sans-serif;
  font-size: 16px;
  font-weight: 500;
  justify-content: center;
  padding-right: 20px;
  width: auto !important;
}

.evo-widget-bubble.evo-widget--expanded.evo-widget-bubble-color--lighter div{
  color: var(--s-700);
}

.evo-widget-bubble.evo-widget--expanded svg {
  height: 20px;
  margin: 14px 8px 14px 16px;
  width: 20px;
}

.evo-widget-bubble.evo-elements--left {
  left: 20px;
}

.evo-widget-bubble.evo-elements--right {
  right: 20px;
}

.evo-widget-bubble:hover {
  background: #1f93ff;
  box-shadow: 0 8px 32px rgba(0, 0, 0, .4) !important;
}

.evo-widget-bubble svg {
  all: revert;
  height: 24px;
  margin: 20px;
  width: 24px;
}

.evo-widget-bubble.evo-widget-bubble-color--lighter path{
  fill: var(--s-700);
}

@media only screen and (min-width: 667px) {
  .evo-widget-holder.evo-elements--left {
    left: 20px;
 }
  .evo-widget-holder.evo-elements--right {
    right: 20px;
 }
}

.evo--close:hover {
  opacity: 1;
}

.evo--close::before, .evo--close::after {
  background-color: #fff;
  content: ' ';
  display: inline;
  height: 24px;
  left: 32px;
  position: absolute;
  top: 20px;
  width: 2px;
}

.evo-widget-bubble-color--lighter.evo--close::before, .evo-widget-bubble-color--lighter.evo--close::after {
  background-color: var(--s-700);
}

.evo--close::before {
  transform: rotate(45deg);
}

.evo--close::after {
  transform: rotate(-45deg);
}

.evo--hide {
  bottom: -100vh !important;
  top: unset !important;
  opacity: 0;
  visibility: hidden !important;
  z-index: -1 !important;
}

.evo-widget--without-bubble {
  bottom: 20px !important;
}
.evo-widget-holder.evo--hide{
  transform: translateY(40px);
}
.evo-widget-bubble.evo--close {
  transform: translateX(0px) scale(1) rotate(0deg);
  transition: transform 300ms ease, opacity 100ms ease, visibility 0ms linear 0ms, bottom 0ms linear 0ms;
}
.evo-widget-bubble.evo--close.evo--hide {
  transform: translateX(8px) scale(.75) rotate(45deg);
  transition: transform 300ms ease, opacity 200ms ease, visibility 0ms linear 500ms, bottom 0ms ease 200ms;
}

.evo-widget-bubble {
  transform-origin: center;
  will-change: transform, opacity;
  transform: translateX(0) scale(1) rotate(0deg);
  transition: transform 300ms ease, opacity 100ms ease, visibility 0ms linear 0ms, bottom 0ms linear 0ms;
}
.evo-widget-bubble.evo--hide {
  transform: translateX(8px) scale(.75) rotate(-30deg);
  transition: transform 300ms ease, opacity 200ms ease, visibility 0ms linear 500ms, bottom 0ms ease 200ms;
}

.evo-widget-bubble.evo-widget--expanded {
  transform: translateX(0px);
  transition: transform 300ms ease, opacity 100ms ease, visibility 0ms linear 0ms, bottom 0ms linear 0ms;
}
.evo-widget-bubble.evo-widget--expanded.evo--hide {
  transform: translateX(8px);
  transition: transform 300ms ease, opacity 200ms ease, visibility 0ms linear 500ms, bottom 0ms ease 200ms;
}
.evo-widget-bubble.evo-widget-bubble--flat.evo--close {
  transform: translateX(0px);
  transition: transform 300ms ease, opacity 10ms ease, visibility 0ms linear 0ms, bottom 0ms linear 0ms;
}
.evo-widget-bubble.evo-widget-bubble--flat.evo--close.evo--hide {
  transform: translateX(8px);
  transition: transform 300ms ease, opacity 200ms ease, visibility 0ms linear 500ms, bottom 0ms ease 200ms;
}
.evo-widget-bubble.evo-widget--expanded.evo-widget-bubble--flat {
  transform: translateX(0px);
  transition: transform 300ms ease, opacity 200ms ease, visibility 0ms linear 0ms, bottom 0ms linear 0ms;
}
.evo-widget-bubble.evo-widget--expanded.evo-widget-bubble--flat.evo--hide {
  transform: translateX(8px);
  transition: transform 300ms ease, opacity 200ms ease, visibility 0ms linear 500ms, bottom 0ms ease 200ms;
}

@media only screen and (max-width: 667px) {
  .evo-widget-holder {
    height: 100%;
    right: 0;
    top: 0;
    width: 100%;
 }

 .evo-widget-holder iframe {
    min-height: 100% !important;
  }


 .evo-widget-holder.has-unread-view {
    height: auto;
    right: 0;
    width: auto;
    bottom: 0;
    top: auto;
    max-height: 100vh;
    padding: 0 8px;
  }

  .evo-widget-holder.has-unread-view iframe {
    min-height: unset !important;
  }

 .evo-widget-holder.has-unread-view.evo-elements--left {
    left: 0;
  }

  .evo-widget-bubble.evo--close {
    bottom: 60px;
    opacity: 0;
    visibility: hidden !important;
    z-index: -1 !important;
  }
}

@media only screen and (min-width: 667px) {
  .evo-widget-holder {
    border-radius: 16px;
    bottom: 104px;
    height: calc(85% - 64px - 20px);
    max-height: 590px !important;
    min-height: 250px !important;
    width: 400px !important;
 }
}

.evo-hidden {
  display: none !important;
}
`;

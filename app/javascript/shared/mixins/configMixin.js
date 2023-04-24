export default {
  computed: {
    hostURL() {
      return window.evochatConfig.hostURL;
    },
    vapidPublicKey() {
      return window.evochatConfig.vapidPublicKey;
    },
    enabledLanguages() {
      return window.evochatConfig.enabledLanguages;
    },
    isEnterprise() {
      return window.evochatConfig.isEnterprise === 'true';
    },
  },
};

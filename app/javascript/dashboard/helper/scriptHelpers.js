import AnalyticsHelper from './AnalyticsHelper';
import LogRocket from 'logrocket';
import DashboardAudioNotificationHelper from './AudioAlerts/DashboardAudioNotificationHelper';

export const EVOCHAT_SET_USER = 'EVOCHAT_SET_USER';
export const EVOCHAT_RESET = 'EVOCHAT_RESET';

export const ANALYTICS_IDENTITY = 'ANALYTICS_IDENTITY';
export const ANALYTICS_RESET = 'ANALYTICS_RESET';

export const initializeAnalyticsEvents = () => {
  window.bus.$on(ANALYTICS_IDENTITY, ({ user }) => {
    AnalyticsHelper.identify(user);
    if (window.logRocketProjectId) {
      LogRocket.identify(user.id, {
        email: user.email,
        name: user.name,
      });
    }
  });
  window.bus.$on(ANALYTICS_RESET, () => {});
};

const initializeAudioAlerts = user => {
  // InitializeAudioNotifications
  const { ui_settings: uiSettings } = user || {};
  const {
    always_play_audio_alert: alwaysPlayAudioAlert,
    enable_audio_alerts: audioAlertType,
    alert_if_unread_assigned_conversation_exist: alertIfUnreadConversationExist,
    notification_tone: audioAlertTone,
  } = uiSettings;

  DashboardAudioNotificationHelper.setInstanceValues({
    currentUserId: user.id,
    audioAlertType: audioAlertType || 'none',
    audioAlertTone: audioAlertTone || 'ding',
    alwaysPlayAudioAlert: alwaysPlayAudioAlert || false,
    alertIfUnreadConversationExist: alertIfUnreadConversationExist || false,
  });
};

export const initializeEvochatEvents = () => {
  window.bus.$on(EVOCHAT_RESET, () => {
    if (window.$evochat) {
      window.$evochat.reset();
    }
  });
  window.bus.$on(EVOCHAT_SET_USER, ({ user }) => {
    if (window.$evochat) {
      window.$evochat.setUser(user.email, {
        avatar_url: user.avatar_url,
        email: user.email,
        identifier_hash: user.hmac_identifier,
        name: user.name,
      });
      window.$evochat.setCustomAttributes({
        signedUpAt: user.created_at,
        cloudCustomer: 'true',
        account_id: user.account_id,
      });
    }

    initializeAudioAlerts(user);
  });
};

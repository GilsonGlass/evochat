<template>
  <loading-state :message="$t('CONFIRM_EMAIL')" />
</template>
<script>
import LoadingState from '../../components/widgets/LoadingState';
import Auth from '../../api/auth';
import { DEFAULT_REDIRECT_URL } from 'dashboard/constants/globals';
export default {
  components: {
    LoadingState,
  },
  props: {
    confirmationToken: {
      type: String,
      default: '',
    },
  },
  mounted() {
    this.confirmToken();
  },
  methods: {
    async confirmToken() {
      try {
        await Auth.verifyPasswordToken({
          confirmationToken: this.confirmationToken,
        });
        window.location = DEFAULT_REDIRECT_URL;
      } catch (error) {
        window.location = DEFAULT_REDIRECT_URL;
      }
    },
  },
};
</script>

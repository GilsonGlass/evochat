<template>
  <div class="row">
    <div class="integration--image">
      <img :src="'/dashboard/images/integrations/' + integrationLogo" />
    </div>
    <div class="integration--type column">
      <h3 class="integration--title">
        {{ integrationName }}
      </h3>
      <p>
        {{
          useInstallationName(
            integrationDescription,
            globalConfig.installationName
          )
        }}
      </p>
    </div>
    <div class="small-2 column button-wrap">
      <evo-label :title="labelText" :color-scheme="labelColor" />
    </div>
    <div class="small-2 column button-wrap">
      <router-link
        :to="
          frontendURL(
            `accounts/${accountId}/settings/applications/` + integrationId
          )
        "
      >
        <evo-button icon="settings">
          {{ $t('INTEGRATION_APPS.CONFIGURE') }}
        </evo-button>
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { frontendURL } from '../../../../helper/URLHelper';
import EvoLabel from 'dashboard/components/ui/Label';
import globalConfigMixin from 'shared/mixins/globalConfigMixin';

export default {
  components: {
    EvoLabel,
  },
  mixins: [globalConfigMixin],
  props: {
    integrationId: {
      type: [String, Number],
      required: true,
    },
    integrationLogo: {
      type: String,
      default: '',
    },
    integrationName: {
      type: String,
      default: '',
    },
    integrationDescription: {
      type: String,
      default: '',
    },
    integrationEnabled: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapGetters({
      accountId: 'getCurrentAccountId',
      globalConfig: 'globalConfig/get',
    }),
    labelText() {
      return this.integrationEnabled
        ? this.$t('INTEGRATION_APPS.STATUS.ENABLED')
        : this.$t('INTEGRATION_APPS.STATUS.DISABLED');
    },
    labelColor() {
      return this.integrationEnabled ? 'success' : 'secondary';
    },
  },
  methods: {
    frontendURL,
  },
};
</script>

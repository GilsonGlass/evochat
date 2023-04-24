<template>
  <div class="column content-box">
    <evo-button
      color-scheme="success"
      class-names="button--fixed-top"
      icon="add-circle"
      @click="openAddPopup"
    >
      {{ buttonText }}
    </evo-button>
    <campaign />
    <evo-modal :show.sync="showAddPopup" :on-close="hideAddPopup">
      <add-campaign @on-close="hideAddPopup" />
    </evo-modal>
  </div>
</template>

<script>
import campaignMixin from 'shared/mixins/campaignMixin';
import Campaign from './Campaign.vue';
import AddCampaign from './AddCampaign';

export default {
  components: {
    Campaign,
    AddCampaign,
  },
  mixins: [campaignMixin],
  data() {
    return { showAddPopup: false };
  },
  computed: {
    buttonText() {
      if (this.isOngoingType) {
        return this.$t('CAMPAIGN.HEADER_BTN_TXT.ONGOING');
      }
      return this.$t('CAMPAIGN.HEADER_BTN_TXT.ONE_OFF');
    },
  },
  mounted() {
    this.$store.dispatch('campaigns/get');
  },
  methods: {
    openAddPopup() {
      this.showAddPopup = true;
    },
    hideAddPopup() {
      this.showAddPopup = false;
    },
  },
};
</script>

<template>
  <evo-dropdown-menu>
    <evo-dropdown-header :title="$t('SIDEBAR.SET_AVAILABILITY_TITLE')" />
    <evo-dropdown-item
      v-for="status in availabilityStatuses"
      :key="status.value"
      class="status-items"
    >
      <evo-button
        size="small"
        :color-scheme="status.disabled ? '' : 'secondary'"
        :variant="status.disabled ? 'smooth' : 'clear'"
        class-names="status-change--dropdown-button"
        @click="changeAvailabilityStatus(status.value)"
      >
        <availability-status-badge :status="status.value" />
        {{ status.label }}
      </evo-button>
    </evo-dropdown-item>
    <evo-dropdown-divider />
    <evo-dropdown-item class="auto-offline--toggle">
      <div class="info-wrap">
        <fluent-icon
          v-tooltip.right-start="$t('SIDEBAR.SET_AUTO_OFFLINE.INFO_TEXT')"
          icon="info"
          size="14"
          class="info-icon"
        />

        <span class="auto-offline--text">
          {{ $t('SIDEBAR.SET_AUTO_OFFLINE.TEXT') }}
        </span>
      </div>

      <evo-switch
        size="small"
        class="auto-offline--switch"
        :value="currentUserAutoOffline"
        @input="updateAutoOffline"
      />
    </evo-dropdown-item>
    <evo-dropdown-divider />
  </evo-dropdown-menu>
</template>

<script>
import { mapGetters } from 'vuex';
import { mixin as clickaway } from 'vue-clickaway';
import alertMixin from 'shared/mixins/alertMixin';
import EvoDropdownItem from 'shared/components/ui/dropdown/DropdownItem';
import EvoDropdownMenu from 'shared/components/ui/dropdown/DropdownMenu';
import EvoDropdownHeader from 'shared/components/ui/dropdown/DropdownHeader';
import EvoDropdownDivider from 'shared/components/ui/dropdown/DropdownDivider';
import AvailabilityStatusBadge from '../widgets/conversation/AvailabilityStatusBadge';
import evoConstants from 'dashboard/constants/globals';

const { AVAILABILITY_STATUS_KEYS } = evoConstants;

export default {
  components: {
    EvoDropdownHeader,
    EvoDropdownDivider,
    EvoDropdownMenu,
    EvoDropdownItem,
    AvailabilityStatusBadge,
  },

  mixins: [clickaway, alertMixin],

  data() {
    return {
      isStatusMenuOpened: false,
      isUpdating: false,
    };
  },

  computed: {
    ...mapGetters({
      getCurrentUserAvailability: 'getCurrentUserAvailability',
      currentAccountId: 'getCurrentAccountId',
      currentUserAutoOffline: 'getCurrentUserAutoOffline',
    }),
    availabilityDisplayLabel() {
      const availabilityIndex = AVAILABILITY_STATUS_KEYS.findIndex(
        key => key === this.currentUserAvailability
      );
      return this.$t('PROFILE_SETTINGS.FORM.AVAILABILITY.STATUSES_LIST')[
        availabilityIndex
      ];
    },
    currentUserAvailability() {
      return this.getCurrentUserAvailability;
    },
    availabilityStatuses() {
      return this.$t('PROFILE_SETTINGS.FORM.AVAILABILITY.STATUSES_LIST').map(
        (statusLabel, index) => ({
          label: statusLabel,
          value: AVAILABILITY_STATUS_KEYS[index],
          disabled:
            this.currentUserAvailability === AVAILABILITY_STATUS_KEYS[index],
        })
      );
    },
  },

  methods: {
    openStatusMenu() {
      this.isStatusMenuOpened = true;
    },
    closeStatusMenu() {
      this.isStatusMenuOpened = false;
    },
    updateAutoOffline(autoOffline) {
      this.$store.dispatch('updateAutoOffline', {
        accountId: this.currentAccountId,
        autoOffline,
      });
    },
    changeAvailabilityStatus(availability) {
      if (this.isUpdating) {
        return;
      }

      this.isUpdating = true;
      try {
        this.$store.dispatch('updateAvailability', {
          availability,
          account_id: this.currentAccountId,
        });
      } catch (error) {
        this.showAlert(
          this.$t('PROFILE_SETTINGS.FORM.AVAILABILITY.SET_AVAILABILITY_ERROR')
        );
      } finally {
        this.isUpdating = false;
      }
    },
  },
};
</script>

<style lang="scss">
@import '~dashboard/assets/scss/variables';

.status {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-micro) var(--space-smaller);
}

.status-view {
  display: flex;
  align-items: baseline;

  & &--title {
    color: var(--b-600);
    font-size: var(--font-size-small);
    font-weight: var(--font-weight-medium);
    margin-left: var(--space-small);

    &:first-letter {
      text-transform: capitalize;
    }
  }
}

.status-change {
  .dropdown-pane {
    top: -132px;
    right: var(--space-normal);
  }

  .status-items {
    display: flex;
    align-items: baseline;
  }
}

.auto-offline--toggle {
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: var(--space-smaller);
  margin: 0;

  .info-wrap {
    display: flex;
    align-items: center;
  }

  .info-icon {
    margin-top: -1px;
  }

  .auto-offline--switch {
    margin: -1px var(--space-micro) 0;
  }

  .auto-offline--text {
    margin: 0 var(--space-smaller);
    font-size: var(--font-size-mini);
    font-weight: var(--font-weight-medium);
    color: var(--s-700);
  }
}
</style>

<template>
  <transition name="menu-slide">
    <div
      v-if="show"
      v-on-clickaway="onClickAway"
      class="options-menu dropdown-pane"
      :class="{ 'dropdown-pane--open': show }"
    >
      <availability-status />
      <li class="divider" />
      <evo-dropdown-menu>
        <evo-dropdown-item v-if="showChangeAccountOption">
          <evo-button
            variant="clear"
            color-scheme="secondary"
            size="small"
            icon="arrow-swap"
            @click="$emit('toggle-accounts')"
          >
            {{ $t('SIDEBAR_ITEMS.CHANGE_ACCOUNTS') }}
          </evo-button>
        </evo-dropdown-item>
        <evo-dropdown-item v-if="globalConfig.evochatInboxToken">
          <evo-button
            variant="clear"
            color-scheme="secondary"
            size="small"
            icon="chat-help"
            @click="$emit('show-support-chat-window')"
          >
            {{ $t('SIDEBAR_ITEMS.CONTACT_SUPPORT') }}
          </evo-button>
        </evo-dropdown-item>
        <evo-dropdown-item>
          <evo-button
            variant="clear"
            color-scheme="secondary"
            size="small"
            icon="keyboard"
            @click="handleKeyboardHelpClick"
          >
            {{ $t('SIDEBAR_ITEMS.KEYBOARD_SHORTCUTS') }}
          </evo-button>
        </evo-dropdown-item>
        <evo-dropdown-item>
          <router-link
            v-slot="{ href, isActive, navigate }"
            :to="`/app/accounts/${accountId}/profile/settings`"
            custom
          >
            <a
              :href="href"
              class="button small clear secondary"
              :class="{ 'is-active': isActive }"
              @click="e => handleProfileSettingClick(e, navigate)"
            >
              <fluent-icon icon="person" size="14" class="icon icon--font" />
              <span class="button__content">
                {{ $t('SIDEBAR_ITEMS.PROFILE_SETTINGS') }}
              </span>
            </a>
          </router-link>
        </evo-dropdown-item>
        <evo-dropdown-item v-if="currentUser.type === 'SuperAdmin'">
          <a
            href="/super_admin"
            class="button small clear secondary"
            target="_blank"
            rel="noopener nofollow noreferrer"
            @click="$emit('close')"
          >
            <fluent-icon
              icon="content-settings"
              size="14"
              class="icon icon--font"
            />
            <span class="button__content">
              {{ $t('SIDEBAR_ITEMS.SUPER_ADMIN_CONSOLE') }}
            </span>
          </a>
        </evo-dropdown-item>
        <evo-dropdown-item>
          <evo-button
            variant="clear"
            color-scheme="secondary"
            size="small"
            icon="power"
            @click="logout"
          >
            {{ $t('SIDEBAR_ITEMS.LOGOUT') }}
          </evo-button>
        </evo-dropdown-item>
      </evo-dropdown-menu>
    </div>
  </transition>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';
import { mapGetters } from 'vuex';
import Auth from '../../../api/auth';
import EvoDropdownItem from 'shared/components/ui/dropdown/DropdownItem';
import EvoDropdownMenu from 'shared/components/ui/dropdown/DropdownMenu';
import AvailabilityStatus from 'dashboard/components/layout/AvailabilityStatus';

export default {
  components: {
    EvoDropdownMenu,
    EvoDropdownItem,
    AvailabilityStatus,
  },
  mixins: [clickaway],
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      currentUser: 'getCurrentUser',
      globalConfig: 'globalConfig/get',
      accountId: 'getCurrentAccountId',
    }),
    showChangeAccountOption() {
      if (this.globalConfig.createNewAccountFromDashboard) {
        return true;
      }

      const { accounts = [] } = this.currentUser;
      return accounts.length > 1;
    },
  },
  methods: {
    handleProfileSettingClick(e, navigate) {
      this.$emit('close');
      navigate(e);
    },
    handleKeyboardHelpClick() {
      this.$emit('key-shortcut-modal');
      this.$emit('close');
    },
    logout() {
      Auth.logout();
    },
    onClickAway() {
      if (this.show) this.$emit('close');
    },
  },
};
</script>
<style lang="scss" scoped>
.options-menu.dropdown-pane {
  left: var(--space-slab);
  bottom: var(--space-larger);
  min-width: var(--space-giga);
  top: unset;
  z-index: var(--z-index-low);
}
</style>

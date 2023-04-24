<template>
  <div class="header--wrap">
    <div class="header-left--wrap">
      <evo-sidemenu-icon />
      <div class="header-title">
        <h3 class="page-title">{{ headerTitle }}</h3>
        <span class="text-block-title count-view">{{ `(${count})` }}</span>
      </div>
    </div>
    <div class="header-right--wrap">
      <evo-button
        v-if="shouldShowSettings"
        class-names="article--buttons"
        icon="filter"
        color-scheme="secondary"
        variant="hollow"
        size="small"
        @click="openFilterModal"
      >
        {{ $t('HELP_CENTER.HEADER.FILTER') }}
      </evo-button>
      <evo-button
        v-if="shouldShowSettings"
        class-names="article--buttons"
        icon="arrow-sort"
        color-scheme="secondary"
        size="small"
        variant="hollow"
        @click="openDropdown"
      >
        {{ $t('HELP_CENTER.HEADER.SORT') }}
        <span class="selected-value">
          {{ selectedValue }}
          <Fluent-icon class="dropdown-arrow" icon="chevron-down" size="14" />
        </span>
      </evo-button>
      <div
        v-if="showSortByDropdown"
        v-on-clickaway="closeDropdown"
        class="dropdown-pane dropdown-pane--open"
      >
        <evo-dropdown-menu>
          <evo-dropdown-item>
            <evo-button
              variant="clear"
              color-scheme="secondary"
              size="small"
              icon="send-clock"
            >
              {{ $t('HELP_CENTER.HEADER.DROPDOWN_OPTIONS.PUBLISHED') }}
            </evo-button>
          </evo-dropdown-item>
          <evo-dropdown-item>
            <evo-button
              variant="clear"
              color-scheme="secondary"
              size="small"
              icon="dual-screen-clock"
            >
              {{ $t('HELP_CENTER.HEADER.DROPDOWN_OPTIONS.DRAFT') }}
            </evo-button>
          </evo-dropdown-item>
          <evo-dropdown-item>
            <evo-button
              variant="clear"
              color-scheme="secondary"
              size="small"
              icon="calendar-clock"
            >
              {{ $t('HELP_CENTER.HEADER.DROPDOWN_OPTIONS.ARCHIVED') }}
            </evo-button>
          </evo-dropdown-item>
        </evo-dropdown-menu>
      </div>
      <evo-button
        v-if="shouldShowSettings"
        v-tooltip.top-end="$t('HELP_CENTER.HEADER.SETTINGS_BUTTON')"
        icon="settings"
        class-names="article--buttons"
        variant="hollow"
        size="small"
        color-scheme="secondary"
      />
      <evo-button
        class-names="article--buttons"
        size="small"
        icon="add"
        color-scheme="primary"
        @click="onClickNewArticlePage"
      >
        {{ $t('HELP_CENTER.HEADER.NEW_BUTTON') }}
      </evo-button>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';

import EvoDropdownItem from 'shared/components/ui/dropdown/DropdownItem.vue';
import EvoDropdownMenu from 'shared/components/ui/dropdown/DropdownMenu.vue';
import FluentIcon from 'shared/components/FluentIcon/DashboardIcon';
export default {
  components: {
    FluentIcon,
    EvoDropdownItem,
    EvoDropdownMenu,
  },
  mixins: [clickaway],
  props: {
    headerTitle: {
      type: String,
      default: '',
    },
    count: {
      type: Number,
      default: 0,
    },
    selectedValue: {
      type: String,
      default: '',
    },
    shouldShowSettings: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showSortByDropdown: false,
    };
  },
  methods: {
    openFilterModal() {
      this.$emit('openModal');
    },
    openDropdown() {
      this.$emit('open');
      this.showSortByDropdown = true;
    },
    closeDropdown() {
      this.$emit('close');
      this.showSortByDropdown = false;
    },
    onClickNewArticlePage() {
      this.$emit('newArticlePage');
    },
  },
};
</script>

<style scoped lang="scss">
.header--wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: var(--space-jumbo);
  padding-top: var(--space-small);
}
.header-left--wrap {
  display: flex;
  align-items: center;

  .header-title {
    display: flex;
    align-items: center;
    margin: 0 var(--space-small);
    .page-title {
      margin-bottom: 0;
    }
  }
}
.header-right--wrap {
  display: flex;
  align-items: center;
}
.count-view {
  margin: 0 var(--space-smaller);
}
.dropdown-pane--open {
  top: var(--space-larger);
  right: 14.8rem;
}
.selected-value {
  display: inline-flex;
  margin-left: var(--space-smaller);
  color: var(--b-900);
  align-items: center;
}
.dropdown-arrow {
  margin-left: var(--space-smaller);
}
.article--buttons {
  margin-left: var(--space-smaller);
}
</style>

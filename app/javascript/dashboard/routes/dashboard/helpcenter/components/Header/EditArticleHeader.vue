<template>
  <div class="header--wrap">
    <div class="header-left--wrap">
      <evo-button
        icon="chevron-left"
        variant="clear"
        size="small"
        color-scheme="primary"
        class="back-button"
        @click="onClickGoBack"
      >
        {{ backButtonLabel }}
      </evo-button>
    </div>
    <div class="header-right--wrap">
      <span v-if="isUpdating || isSaved" class="draft-status">
        {{ statusText }}
      </span>

      <evo-button
        class-names="article--buttons"
        icon="globe"
        color-scheme="secondary"
        variant="hollow"
        size="small"
        @click="showPreview"
      >
        {{ $t('HELP_CENTER.EDIT_HEADER.PREVIEW') }}
      </evo-button>
      <!-- Hidden since this is in V2
      <evo-button
        v-if="shouldShowAddLocaleButton"
        class-names="article--buttons"
        icon="add"
        color-scheme="secondary"
        variant="hollow"
        size="small"
        @click="onClickAdd"
      >
        {{ $t('HELP_CENTER.EDIT_HEADER.ADD_TRANSLATION') }}
      </evo-button> -->
      <evo-button
        v-if="!isSidebarOpen"
        v-tooltip.top-end="$t('HELP_CENTER.EDIT_HEADER.OPEN_SIDEBAR')"
        icon="pane-open"
        class-names="article--buttons sidebar-button"
        variant="hollow"
        size="small"
        color-scheme="secondary"
        :is-disabled="enableOpenSidebarButton"
        @click="openSidebar"
      />
      <evo-button
        v-if="isSidebarOpen"
        v-tooltip.top-end="$t('HELP_CENTER.EDIT_HEADER.CLOSE_SIDEBAR')"
        icon="pane-close"
        class-names="article--buttons"
        variant="hollow"
        size="small"
        color-scheme="secondary"
        @click="closeSidebar"
      />
      <div class="article--buttons">
        <div class="button-group">
          <evo-button
            class-names="publish-button"
            size="small"
            icon="checkmark"
            color-scheme="primary"
            :is-disabled="!articleSlug || isPublishedArticle"
            @click="updateArticleStatus(ARTICLE_STATUS_TYPES.PUBLISH)"
          >
            {{ $t('HELP_CENTER.EDIT_HEADER.PUBLISH_BUTTON') }}
          </evo-button>
          <evo-button
            ref="arrowDownButton"
            size="small"
            icon="chevron-down"
            :is-disabled="!articleSlug || isArchivedArticle"
            @click="openActionsDropdown"
          />
        </div>
        <div
          v-if="showActionsDropdown"
          v-on-clickaway="closeActionsDropdown"
          class="dropdown-pane dropdown-pane--open"
        >
          <evo-dropdown-menu>
            <evo-dropdown-item>
              <evo-button
                variant="clear"
                color-scheme="secondary"
                size="small"
                icon="book-clock"
                @click="updateArticleStatus(ARTICLE_STATUS_TYPES.ARCHIVE)"
              >
                {{ $t('HELP_CENTER.EDIT_HEADER.MOVE_TO_ARCHIVE_BUTTON') }}
              </evo-button>
            </evo-dropdown-item>
          </evo-dropdown-menu>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import alertMixin from 'shared/mixins/alertMixin';
import { mixin as clickaway } from 'vue-clickaway';
import evoConstants from 'dashboard/constants/globals';
import { PORTALS_EVENTS } from '../../../../../helper/AnalyticsHelper/events';

const { ARTICLE_STATUS_TYPES } = evoConstants;

export default {
  mixins: [alertMixin, clickaway],
  props: {
    isSidebarOpen: {
      type: Boolean,
      default: true,
    },
    backButtonLabel: {
      type: String,
      default: '',
    },
    isUpdating: {
      type: Boolean,
      default: false,
    },
    isSaved: {
      type: Boolean,
      default: false,
    },
    enableOpenSidebarButton: {
      type: Boolean,
      default: false,
    },
    shouldShowAddLocaleButton: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showActionsDropdown: false,
      alertMessage: '',
      ARTICLE_STATUS_TYPES,
    };
  },
  computed: {
    statusText() {
      return this.isUpdating
        ? this.$t('HELP_CENTER.EDIT_HEADER.SAVING')
        : this.$t('HELP_CENTER.EDIT_HEADER.SAVED');
    },
    articleSlug() {
      return this.$route.params.articleSlug;
    },
    currentPortalSlug() {
      return this.$route.params.portalSlug;
    },
    currentArticleStatus() {
      return this.$store.getters['articles/articleStatus'](this.articleSlug);
    },
    isPublishedArticle() {
      return this.currentArticleStatus === 'published';
    },
    isArchivedArticle() {
      return this.currentArticleStatus === 'archived';
    },
  },
  methods: {
    onClickGoBack() {
      this.$emit('back');
    },
    showPreview() {
      this.$emit('show');
    },
    onClickAdd() {
      this.$emit('add');
    },
    async updateArticleStatus(status) {
      try {
        await this.$store.dispatch('articles/update', {
          portalSlug: this.currentPortalSlug,
          articleId: this.articleSlug,
          status: status,
        });
        this.statusUpdateSuccessMessage(status);
        this.closeActionsDropdown();
        if (status === this.ARTICLE_STATUS_TYPES.ARCHIVE) {
          this.$track(PORTALS_EVENTS.ARCHIVE_ARTICLE, { uiFrom: 'header' });
        } else if (status === this.ARTICLE_STATUS_TYPES.PUBLISH) {
          this.$track(PORTALS_EVENTS.PUBLISH_ARTICLE);
        }
      } catch (error) {
        this.alertMessage =
          error?.message || this.statusUpdateErrorMessage(status);
      } finally {
        this.showAlert(this.alertMessage);
      }
    },
    statusUpdateSuccessMessage(status) {
      if (status === this.ARTICLE_STATUS_TYPES.PUBLISH) {
        this.alertMessage = this.$t('HELP_CENTER.PUBLISH_ARTICLE.API.SUCCESS');
      } else if (status === this.ARTICLE_STATUS_TYPES.ARCHIVE) {
        this.alertMessage = this.$t('HELP_CENTER.ARCHIVE_ARTICLE.API.SUCCESS');
      }
    },
    statusUpdateErrorMessage(status) {
      if (status === this.ARTICLE_STATUS_TYPES.PUBLISH) {
        this.alertMessage = this.$t('HELP_CENTER.PUBLISH_ARTICLE.API.ERROR');
      } else if (status === this.ARTICLE_STATUS_TYPES.ARCHIVE) {
        this.alertMessage = this.$t('HELP_CENTER.ARCHIVE_ARTICLE.API.ERROR');
      }
    },
    openSidebar() {
      this.$emit('open');
    },
    closeSidebar() {
      this.$emit('close');
    },
    openActionsDropdown() {
      this.showActionsDropdown = !this.showActionsDropdown;
    },
    closeActionsDropdown() {
      this.showActionsDropdown = false;
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
}
.header-right--wrap {
  display: flex;
  align-items: center;
}
.article--buttons {
  position: relative;
  margin-left: var(--space-smaller);
  .dropdown-pane {
    position: absolute;
    right: 0;
  }
}
.draft-status {
  margin-right: var(--space-smaller);
  margin-left: var(--space-normal);
  color: var(--s-400);
  align-items: center;
  font-size: var(--font-size-mini);
  animation: fadeIn 1s;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>

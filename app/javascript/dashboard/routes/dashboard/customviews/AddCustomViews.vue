<template>
  <evo-modal :show.sync="show" :on-close="onClose">
    <evo-modal-header :header-title="$t('FILTER.CUSTOM_VIEWS.ADD.TITLE')" />
    <form class="row" @submit.prevent="saveCustomViews">
      <div class="medium-12 columns">
        <evo-input
          v-model="name"
          :label="$t('FILTER.CUSTOM_VIEWS.ADD.LABEL')"
          type="text"
          :error="
            $v.name.$error ? $t('FILTER.CUSTOM_VIEWS.ADD.ERROR_MESSAGE') : ''
          "
          :class="{ error: $v.name.$error }"
          :placeholder="$t('FILTER.CUSTOM_VIEWS.ADD.PLACEHOLDER')"
          @blur="$v.name.$touch"
        />

        <div class="modal-footer">
          <evo-button :disabled="isButtonDisabled">
            {{ $t('FILTER.CUSTOM_VIEWS.ADD.SAVE_BUTTON') }}
          </evo-button>
          <evo-button variant="clear" @click.prevent="onClose">
            {{ $t('FILTER.CUSTOM_VIEWS.ADD.CANCEL_BUTTON') }}
          </evo-button>
        </div>
      </div>
    </form>
  </evo-modal>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';
import alertMixin from 'shared/mixins/alertMixin';
import { CONTACTS_EVENTS } from '../../../helper/AnalyticsHelper/events';

export default {
  mixins: [alertMixin],
  props: {
    filterType: {
      type: Number,
      default: 0,
    },
    customViewsQuery: {
      type: Object,
      default: () => {},
    },
    openLastSavedItem: {
      type: Function,
      default: () => {},
    },
  },

  data() {
    return {
      show: true,
      name: '',
    };
  },

  computed: {
    isButtonDisabled() {
      return this.$v.name.$invalid;
    },
  },

  validations: {
    name: {
      required,
      minLength: minLength(1),
    },
  },

  methods: {
    onClose() {
      this.$emit('close');
    },
    async saveCustomViews() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      try {
        await this.$store.dispatch('customViews/create', {
          name: this.name,
          filter_type: this.filterType,
          query: this.customViewsQuery,
        });
        this.alertMessage =
          this.filterType === 0
            ? this.$t('FILTER.CUSTOM_VIEWS.ADD.API_FOLDERS.SUCCESS_MESSAGE')
            : this.$t('FILTER.CUSTOM_VIEWS.ADD.API_SEGMENTS.SUCCESS_MESSAGE');
        this.onClose();

        this.$track(CONTACTS_EVENTS.SAVE_FILTER, {
          type: this.filterType === 0 ? 'folder' : 'segment',
        });
      } catch (error) {
        const errorMessage = error?.message;
        this.alertMessage =
          errorMessage || this.filterType === 0
            ? this.$t('FILTER.CUSTOM_VIEWS.ADD.API_FOLDERS.ERROR_MESSAGE')
            : this.$t('FILTER.CUSTOM_VIEWS.ADD.API_SEGMENTS.ERROR_MESSAGE');
      } finally {
        this.showAlert(this.alertMessage);
      }
      this.openLastSavedItem();
    },
  },
};
</script>

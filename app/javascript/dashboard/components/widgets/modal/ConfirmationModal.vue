<template>
  <modal :show.sync="show" :on-close="cancel">
    <div class="column content-box">
      <evo-modal-header :header-title="title" :header-content="description" />
      <div class="modal-footer">
        <evo-button variant="clear" @click="cancel">
          {{ cancelLabel }}
        </evo-button>
        <evo-button @click="confirm">
          {{ confirmLabel }}
        </evo-button>
      </div>
    </div>
  </modal>
</template>
<script>
import Modal from '../../Modal';

export default {
  components: {
    Modal,
  },
  props: {
    title: {
      type: String,
      default: 'This is a title',
    },
    description: {
      type: String,
      default: 'This is your description',
    },
    confirmLabel: {
      type: String,
      default: 'Yes',
    },
    cancelLabel: {
      type: String,
      default: 'No',
    },
  },
  data: () => ({
    show: false,
    resolvePromise: undefined,
    rejectPromise: undefined,
  }),

  methods: {
    showConfirmation() {
      this.show = true;
      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve;
        this.rejectPromise = reject;
      });
    },
    confirm() {
      this.resolvePromise(true);
      this.show = false;
    },

    cancel() {
      this.resolvePromise(false);
      this.show = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.modal-container .modal-footer {
  padding: var(--space-normal) var(--space-medium);
}
</style>

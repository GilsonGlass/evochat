<template>
  <modal :show.sync="show" :on-close="onClose">
    <evo-modal-header
      :header-title="title"
      :header-content="message"
      :header-content-value="messageValue"
    />
    <div class="modal-footer delete-item">
      <evo-button variant="clear" class="action-button" @click="onClose">
        {{ rejectText }}
      </evo-button>
      <evo-button
        color-scheme="alert"
        class="action-button"
        variant="smooth"
        @click="onConfirm"
      >
        {{ confirmText }}
      </evo-button>
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
    show: Boolean,
    onClose: { type: Function, default: () => {} },
    onConfirm: { type: Function, default: () => {} },
    title: { type: String, default: '' },
    message: { type: String, default: '' },
    messageValue: { type: String, default: '' },
    confirmText: { type: String, default: '' },
    rejectText: { type: String, default: '' },
  },
};
</script>
<style lang="scss" scoped>
.action-button {
  max-width: var(--space-giga);
}
</style>

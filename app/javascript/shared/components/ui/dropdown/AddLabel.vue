<template>
  <evo-button
    variant="smooth"
    class="label--add"
    icon="add"
    size="tiny"
    @click="addLabel"
  >
    {{ $t('CONTACT_PANEL.LABELS.CONVERSATION.ADD_BUTTON') }}
  </evo-button>
</template>

<script>
export default {
  methods: {
    addLabel() {
      this.$emit('add');
    },
  },
};
</script>

<style lang="scss" scoped>
.label--add {
  margin-bottom: var(--space-micro);
  margin-right: var(--space-micro);
}
</style>

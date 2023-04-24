<template>
  <div class="manage-subscription">
    <div>
      <h6>{{ title }}</h6>
      <p class="manage-subscription--description">
        {{ description }}
      </p>
    </div>
    <div>
      <evo-button variant="smooth" :icon="buttonIcon" @click="$emit('click')">
        {{ buttonLabel }}
      </evo-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    buttonLabel: {
      type: String,
      default: '',
    },

    buttonIcon: {
      type: String,
      default: 'edit',
    },
  },
};
</script>

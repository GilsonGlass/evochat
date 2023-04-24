<template>
  <li class="sub-menu-container">
    <ul class="sub-menu-li-container">
      <evo-dropdown-header :title="title" />
      <slot />
    </ul>
  </li>
</template>
<script>
import EvoDropdownHeader from 'shared/components/ui/dropdown/DropdownHeader';

export default {
  name: 'EvoDropdownMenu',
  componentName: 'EvoDropdownMenu',

  components: {
    EvoDropdownHeader,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>
<style lang="scss" scoped>
.sub-menu-container {
  margin-top: var(--space-micro);
}

.sub-menu-li-container {
  margin: 0;
}
</style>

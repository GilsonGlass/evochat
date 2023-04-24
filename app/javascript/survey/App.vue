<template>
  <div id="app" class="evo-survey-wrap">
    <response />
  </div>
</template>

<script>
import Response from './views/Response.vue';

export default {
  name: 'App',
  components: {
    Response,
  },
};
</script>

<style lang="scss">
@import '~survey/assets/scss/evo.scss';
</style>

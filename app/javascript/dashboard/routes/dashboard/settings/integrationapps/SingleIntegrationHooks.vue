<template>
  <div class="column content-box">
    <div class="small-12 columns integrations-wrap">
      <div class="small-12 columns integration">
        <div class="row">
          <div class="integration--image">
            <img :src="'/dashboard/images/integrations/' + integration.logo" />
          </div>
          <div class="integration--type column">
            <h3 class="integration--title">
              {{ integration.name }}
            </h3>
            <p>
              {{ integration.description }}
            </p>
          </div>
          <div class="small-2 column button-wrap">
            <div v-if="hasConnectedHooks">
              <div @click="$emit('delete', integration.hooks[0])">
                <evo-button class="nice alert">
                  {{ $t('INTEGRATION_APPS.DISCONNECT.BUTTON_TEXT') }}
                </evo-button>
              </div>
            </div>
            <div v-else>
              <evo-button class="button nice" @click="$emit('add')">
                {{ $t('INTEGRATION_APPS.CONNECT.BUTTON_TEXT') }}
              </evo-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import hookMixin from './hookMixin';
export default {
  mixins: [hookMixin],
  props: {
    integration: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<template>
  <evo-tabs :index="activeTabIndex" @change="onTabChange">
    <evo-tabs-item
      v-for="item in items"
      :key="item.key"
      :name="item.name"
      :count="item.count"
    />
  </evo-tabs>
</template>
<script>
import evoConstants from 'dashboard/constants/globals';
import eventListenerMixins from 'shared/mixins/eventListenerMixins';
import { hasPressedAltAndNKey } from 'shared/helpers/KeyboardHelpers';

export default {
  mixins: [eventListenerMixins],
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    activeTab: {
      type: String,
      default: evoConstants.ASSIGNEE_TYPE.ME,
    },
  },
  computed: {
    activeTabIndex() {
      return this.items.findIndex(item => item.key === this.activeTab);
    },
  },
  methods: {
    handleKeyEvents(e) {
      if (hasPressedAltAndNKey(e)) {
        if (this.activeTab === evoConstants.ASSIGNEE_TYPE.ALL) {
          this.onTabChange(0);
        } else {
          this.onTabChange(this.activeTabIndex + 1);
        }
      }
    },
    onTabChange(selectedTabIndex) {
      if (this.items[selectedTabIndex].key !== this.activeTab) {
        this.$emit('chatTabChange', this.items[selectedTabIndex].key);
      }
    },
  },
};
</script>

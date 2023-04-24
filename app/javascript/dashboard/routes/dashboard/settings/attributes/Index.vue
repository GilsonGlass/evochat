<template>
  <div class="column content-box">
    <evo-button
      color-scheme="success"
      class-names="button--fixed-top"
      icon="add-circle"
      @click="openAddPopup()"
    >
      {{ $t('ATTRIBUTES_MGMT.HEADER_BTN_TXT') }}
    </evo-button>
    <custom-attribute />
    <evo-modal :show.sync="showAddPopup" :on-close="hideAddPopup">
      <add-attribute :on-close="hideAddPopup" />
    </evo-modal>
  </div>
</template>

<script>
import AddAttribute from './AddAttribute';
import CustomAttribute from './CustomAttribute';
export default {
  components: {
    AddAttribute,
    CustomAttribute,
  },
  data() {
    return {
      showAddPopup: false,
    };
  },
  methods: {
    openAddPopup() {
      this.showAddPopup = true;
    },
    hideAddPopup() {
      this.showAddPopup = false;
    },
  },
};
</script>

<style></style>

<template>
  <div class="card">
    <evo-message-editor
      v-model="noteContent"
      class="input--note"
      :placeholder="$t('NOTES.ADD.PLACEHOLDER')"
      :enable-suggestions="false"
    />
    <div class="footer">
      <evo-button
        color-scheme="warning"
        :title="$t('NOTES.ADD.TITLE')"
        :is-disabled="buttonDisabled"
        @click="onAdd"
      >
        {{ $t('NOTES.ADD.BUTTON') }} (⌘⏎)
      </evo-button>
    </div>
  </div>
</template>

<script>
import EvoMessageEditor from 'dashboard/components/widgets/EvoWriter/Editor';
import { hasPressedCommandAndEnter } from 'shared/helpers/KeyboardHelpers';
export default {
  components: {
    EvoMessageEditor,
  },

  data() {
    return {
      noteContent: '',
    };
  },

  computed: {
    buttonDisabled() {
      return this.noteContent === '';
    },
  },

  mounted() {
    document.addEventListener('keydown', this.onMetaEnter);
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.onMetaEnter);
  },

  methods: {
    onMetaEnter(e) {
      if (hasPressedCommandAndEnter(e)) {
        e.preventDefault();
        this.onAdd();
      }
    },
    onAdd() {
      if (this.noteContent !== '') {
        this.$emit('add', this.noteContent);
      }
      this.noteContent = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.input--note {
  &::v-deep .ProseMirror-menubar {
    padding: 0;
    margin-top: var(--space-minus-small);
  }

  &::v-deep .ProseMirror-evo-style {
    max-height: 36rem;
  }
}

.footer {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
</style>

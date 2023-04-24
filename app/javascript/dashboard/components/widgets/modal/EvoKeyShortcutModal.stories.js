import EvoKeyboardShortcutModal from './EvoKeyShortcutModal.vue';

export default {
  title: 'Components/Shortcuts/Keyboard Shortcut',
  component: EvoKeyboardShortcutModal,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { EvoKeyboardShortcutModal },
  template:
    '<evo-keyboard-shortcut-modal v-bind="$props"></evo-keyboard-shortcut-modal>',
});

export const KeyboardShortcut = Template.bind({});
KeyboardShortcut.args = {};

import { action } from '@storybook/addon-actions';
import EvoButton from '../EvoButton.vue';

export default {
  title: 'Components/Button',
  component: EvoButton,
  argTypes: {
    colorScheme: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'success', 'alert', 'warning'],
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['tiny', 'small', 'medium', 'large', 'expanded'],
      },
    },
    variant: {
      control: {
        type: 'select',
        options: ['hollow', 'clear'],
      },
    },
    isLoading: {
      control: {
        type: 'boolean',
      },
    },
    isDisabled: {
      control: {
        type: 'boolean',
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { EvoButton },
  template:
    '<evo-button v-bind="$props" @click="onClick">{{label}}</evo-button>',
});

export const Primary = Template.bind({});
Primary.args = {
  label: 'New message',
  onClick: action('Hello'),
};

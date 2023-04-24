import { action } from '@storybook/addon-actions';
import evoInput from './Input';

export default {
  title: 'Components/Form/Input',
  component: evoInput,
  argTypes: {
    label: {
      defaultValue: 'Email Address',
      control: {
        type: 'text',
      },
    },
    type: {
      defaultValue: 'email',
      control: {
        type: 'text',
      },
    },
    placeholder: {
      defaultValue: 'Please enter your email address',
      control: {
        type: 'text',
      },
    },
    value: {
      defaultValue: 'John12@ync.in',
      control: {
        type: 'text ,number',
      },
    },
    error: {
      defaultValue: '',
      control: {
        type: 'text',
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { evoInput },
  template: '<evo-input v-bind="$props" @input="onClick"></evo-input>',
});

export const Input = Template.bind({});
Input.args = {
  onClick: action('Added'),
};

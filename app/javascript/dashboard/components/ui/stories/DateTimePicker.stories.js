import { action } from '@storybook/addon-actions';
import EvoDateTimePicker from '../DateTimePicker.vue';

export default {
  title: 'Components/Date Picker/Date Time Picker',
  argTypes: {
    confirmText: {
      defaultValue: 'Apply',
      control: {
        type: 'text',
      },
    },
    placeholder: {
      defaultValue: 'Select date time',
      control: {
        type: 'text',
      },
    },
    value: {
      control: {
        type: 'text',
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { EvoDateTimePicker },
  template:
    '<evo-date-time-picker v-bind="$props" @change="onChange"></evo-date-time-picker>',
});

export const DateTimePicker = Template.bind({});
DateTimePicker.args = {
  onChange: action('applied'),
  value: new Date(),
};

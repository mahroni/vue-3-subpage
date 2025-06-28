import type { Meta, StoryObj } from '@storybook/vue3';
import MainTab from '../../../components/common/Tabs/MainTab.vue';

const meta: Meta<typeof MainTab> = {
  title: 'Components/Tab/MainTab',
  component: MainTab,
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      control: { type: 'object' }, // Control for an array of strings
      description: 'Array of tab labels.',
      table: {
        type: { summary: 'string[]' },
      },
    },
    modelValue: {
      control: { type: 'text' }, // Control for the currently active tab
      description: 'The currently active tab. Use `v-model` for two-way binding.',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof MainTab>;

export const Default: Story = {
  args: {
    tabs: ['Home', 'Profile', 'Settings'],
    modelValue: 'Home',
  },
};

export const LongTabs: Story = {
  args: {
    tabs: ['Overview', 'Details and Specifications', 'Reviews & Ratings', 'Support'],
    modelValue: 'Overview',
  },
};

export const NoInitialSelection: Story = {
  args: {
    tabs: ['One', 'Two', 'Three', 'Four'],
    modelValue: 'One', // Your component's current implementation would default to 'One'
  },
};

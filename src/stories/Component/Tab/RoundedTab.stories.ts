import type { Meta, StoryObj } from '@storybook/vue3';

import RoundedTab from '@/components/common/Tabs/RoundedTab.vue';
// Adjust the path if your component is in a different location
import { HomeIcon, SettingIcon, UserIcon } from '@/components/icons';

// Example icons, install 'lucide-vue-next' if you want to use them

const meta: Meta<typeof RoundedTab> = {
  title: 'Components/Tab/RoundedTab',
  component: RoundedTab,
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      control: 'object',
      description: 'An array of tab objects, each with a label and optional icon.',
    },
    modelValue: {
      control: 'text',
      description: "The currently active tab's label.",
    },
  },
  args: {
    tabs: [
      { label: 'Home', icon: HomeIcon },
      { label: 'Settings', icon: SettingIcon },
      { label: 'Users', icon: UserIcon },
    ],
    modelValue: 'Home',
  },
};

export default meta;

type Story = StoryObj<typeof RoundedTab>;

/*
 * Default story for the Tab component, showing its basic usage.
 */
export const Default: Story = {
  args: {
    modelValue: 'Home',
  },
};

/*
 * Story demonstrating the Tab component with a different active tab.
 */
export const ActiveTab: Story = {
  args: {
    modelValue: 'Settings',
  },
};

/*
 * Story demonstrating the Tab component with only text labels (no icons).
 */
export const TextOnly: Story = {
  args: {
    tabs: [{ label: 'Products' }, { label: 'Services' }, { label: 'About Us' }],
    modelValue: 'Products',
  },
};

/*
 * Story demonstrating the Tab component with a long label to test responsiveness.
 */
export const LongLabel: Story = {
  args: {
    tabs: [
      { label: 'Dashboard Overview' },
      { label: 'Analytics Reports' },
      { label: 'User Management' },
    ],
    modelValue: 'Dashboard Overview',
  },
};

/*
 * Story demonstrating the Tab component with no initial active tab (empty modelValue).
 */
export const NoActiveTab: Story = {
  args: {
    modelValue: '',
  },
};

/*
 * Story demonstrating the Tab component with a custom set of icons.
 * Make sure to import any new icons you use.
 */
export const CustomIcons: Story = {
  args: {
    tabs: [
      { label: 'Email', icon: HomeIcon }, // Using HomeIcon as an example
      { label: 'Chat', icon: UserIcon }, // Using UsersIcon as an example
      { label: 'Calls', icon: SettingIcon }, // Using SettingsIcon as an example
    ],
    modelValue: 'Chat',
  },
};

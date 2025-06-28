import type { Meta, StoryObj } from '@storybook/vue3';
import SubTab from '@/components/common/Tabs/SubTab.vue';
import HomeIcon from '@/components/icons/HomeIcon.vue';
import { BroadcastIcon, SettingIcon, UserIcon } from '@/components/icons';

const meta: Meta<typeof SubTab> = {
  title: 'Components/Tab/SubTab',
  component: SubTab,
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      control: 'object',
      description: 'An array of tab items to display.',
    },
    modelValue: {
      control: 'object',
      description: 'The currently active tab item.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof SubTab>;

export const Default: Story = {
  args: {
    tabs: [
      { id: 'home', label: 'Home', icon: HomeIcon },
      { id: 'profile', label: 'Profile', icon: UserIcon },
      { id: 'settings', label: 'Settings', icon: SettingIcon },
    ],
    modelValue: { id: 'home', label: 'Home', icon: HomeIcon },
  },
};

export const WithChildren: Story = {
  args: {
    tabs: [
      {
        id: 'products',
        label: 'Products',
        icon: BroadcastIcon,
        children: [
          { id: 'electronics', label: 'Electronics' },
          { id: 'clothing', label: 'Clothing' },
          {
            id: 'books',
            label: 'Books',
            children: [
              { id: 'fiction', label: 'Fiction' },
              { id: 'non-fiction', label: 'Non-Fiction' },
            ],
          },
        ],
      },
      { id: 'services', label: 'Services', icon: BroadcastIcon },
      { id: 'about', label: 'About Us', icon: SettingIcon },
    ],
    modelValue: { id: 'products', label: 'Products', icon: BroadcastIcon },
  },
};

export const ActiveTabProfile: Story = {
  args: {
    tabs: [
      { id: 'home', label: 'Home', icon: HomeIcon },
      { id: 'profile', label: 'Profile', icon: UserIcon },
      { id: 'settings', label: 'Settings', icon: SettingIcon },
    ],
    modelValue: { id: 'profile', label: 'Profile', icon: UserIcon },
  },
};

export const NoIcons: Story = {
  args: {
    tabs: [
      { id: 'tabA', label: 'Tab A' },
      { id: 'tabB', label: 'Tab B' },
      { id: 'tabC', label: 'Tab C' },
    ],
    modelValue: { id: 'tabA', label: 'Tab A' },
  },
};

export const LongLabels: Story = {
  args: {
    tabs: [
      { id: 'very-long-tab-1', label: 'This is a very long tab label that should be truncated' },
      { id: 'short-tab', label: 'Short Tab' },
      {
        id: 'another-long-tab',
        label: 'Another significantly long tab label for testing purposes',
      },
    ],
    modelValue: {
      id: 'very-long-tab-1',
      label: 'This is a very long tab label that should be truncated',
    },
  },
};

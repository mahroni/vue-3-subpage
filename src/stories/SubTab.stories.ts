import type { Meta, StoryObj } from '@storybook/vue3';
import SubTab from '../components/common/Tabs/SubTab.vue';

const meta: Meta<typeof SubTab> = {
  title: 'Components/SubTab',
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
    }
  },
};

export default meta;

type Story = StoryObj<typeof SubTab>;

export const Default: Story = {
  args: {
    tabs: [
      { id: 'home', label: 'Home', icon: 'home' },
      { id: 'profile', label: 'Profile', icon: 'user' },
      { id: 'settings', label: 'Settings', icon: 'setting' },
    ],
    modelValue: { id: 'home', label: 'Home', icon: 'home' },
  },
};

export const WithChildren: Story = {
  args: {
    tabs: [
      { id: 'products', label: 'Products', icon: 'broadcast', children: [
        { id: 'electronics', label: 'Electronics' },
        { id: 'clothing', label: 'Clothing' },
        { id: 'books', label: 'Books', children: [
          { id: 'fiction', label: 'Fiction' },
          { id: 'non-fiction', label: 'Non-Fiction' },
        ]},
      ]},
      { id: 'services', label: 'Services', icon: 'broadcast' },
      { id: 'about', label: 'About Us', icon: 'setting' },
    ],
    modelValue: { id: 'products', label: 'Products', icon: 'broadcast' },
  },
};

export const ActiveTabProfile: Story = {
  args: {
    tabs: [
      { id: 'home', label: 'Home', icon: 'home' },
      { id: 'profile', label: 'Profile', icon: 'user' },
      { id: 'settings', label: 'Settings', icon: 'setting' },
    ],
    modelValue: { id: 'profile', label: 'Profile', icon: 'user' },
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
      { id: 'another-long-tab', label: 'Another significantly long tab label for testing purposes' },
    ],
    modelValue: { id: 'very-long-tab-1', label: 'This is a very long tab label that should be truncated' },
  },
};
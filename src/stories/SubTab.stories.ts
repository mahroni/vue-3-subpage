import type { Meta, StoryObj } from '@storybook/vue3';
import SubTab from '../components/common/Tabs/SubTab.vue';

// Define your TabItem interface if it's not globally available
interface TabItem {
  id: string;
  label: string;
  icon?: string;
  children?: TabItem[];
}

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
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
    },
    'update:modelValue': {
      action: 'update:modelValue',
      description: 'Event emitted when the selected tab changes.',
    },
  },
  // This is where we can define global decorators or parameters for all stories
  // For example, if you need to wrap your component with a specific provider
  // decorators: [
  //   () => ({ template: '<div style="margin: 3em;"><story/></div>' })
  // ],
};

export default meta;

type Story = StoryObj<typeof SubTab>;

// --- Stories ---

// Story 1: Default Tabs
export const Default: Story = {
  args: {
    tabs: [
      { id: 'home', label: 'Home', icon: 'home' },
      { id: 'profile', label: 'Profile', icon: 'user' },
      { id: 'settings', label: 'Settings', icon: 'setting' },
    ],
    modelValue: { id: 'home', label: 'Home', icon: 'home' },
  },
  // Play function to simulate user interaction (e.g., clicking tabs)
  // See https://storybook.js.org/docs/essentials/actions#writing-play-functions
  // play: async ({ args, canvasElement }) => {
  //   const canvas = within(canvasElement);
  //   // Example: Click on the 'Profile' tab
  //   await userEvent.click(canvas.getByText('Profile'));
  //   await expect(args['update:modelValue']).toHaveBeenCalledWith(expect.objectContaining({ id: 'profile' }));
  // },
};

// Story 2: Tabs with Children (Nested Tabs)
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

// Story 3: Active Tab (Profile)
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

// Story 4: No Icons
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

// Story 5: Long Tab Labels (to test `text-ellipsis`)
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
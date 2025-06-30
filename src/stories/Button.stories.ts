import type { Meta, StoryObj } from '@storybook/vue3';



import Button from '../components/common/Button.vue';





const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile button component with multiple intents, sizes, and shapes. Features smooth animations, hover effects, and supports both button and router-link functionality. Includes options to disable animations for better performance or accessibility.',
      },
    },
  },
  argTypes: {
    intent: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger', 'flat'],
      description:
        'The visual style of the button. Flat buttons have a simple underline hover effect.',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the button',
    },
    shape: {
      control: { type: 'select' },
      options: ['rounded', 'rectangular'],
      description: 'The shape of the button corners',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled. Disabled buttons have no animations.',
    },
    disableAnimation: {
      control: { type: 'boolean' },
      description:
        'Disable all animations and hover effects for better performance or accessibility',
    },
    to: {
      control: { type: 'text' },
      description: 'Router link destination (makes button a router-link)',
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
      description: 'The type of button (only applies when not a router-link)',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    default: 'Button',
  },
};

// Primary button
export const Primary: Story = {
  args: {
    intent: 'primary',
    default: 'Primary Button',
  },
};

// Secondary button
export const Secondary: Story = {
  args: {
    intent: 'secondary',
    default: 'Secondary Button',
  },
};

// Danger button
export const Danger: Story = {
  args: {
    intent: 'danger',
    default: 'Danger Button',
  },
};

// Flat button
export const Flat: Story = {
  args: {
    intent: 'flat',
    default: 'Flat Button',
  },
};

// Size variants
export const Small: Story = {
  args: {
    size: 'small',
    default: 'Small Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    default: 'Large Button',
  },
};

// Shape variants
export const Rounded: Story = {
  args: {
    shape: 'rounded',
    default: 'Rounded Button',
  },
};

export const Rectangular: Story = {
  args: {
    shape: 'rectangular',
    default: 'Rectangular Button',
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    disabled: true,
    default: 'Disabled Button',
  },
};

// Animation disabled
export const NoAnimation: Story = {
  args: {
    disableAnimation: true,
    default: 'No Animation Button',
  },
};

// Router link
export const RouterLink: Story = {
  args: {
    to: '/example',
    default: 'Router Link Button',
  },
};

// Animation comparison
export const AnimationComparison: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold mb-4">With Animations (Default)</h3>
          <div class="flex gap-4 flex-wrap">
            <Button intent="primary">Primary</Button>
            <Button intent="secondary">Secondary</Button>
            <Button intent="danger">Danger</Button>
            <Button intent="flat">Flat</Button>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Without Animations</h3>
          <div class="flex gap-4 flex-wrap">
            <Button intent="primary" :disable-animation="true">Primary</Button>
            <Button intent="secondary" :disable-animation="true">Secondary</Button>
            <Button intent="danger" :disable-animation="true">Danger</Button>
            <Button intent="flat" :disable-animation="true">Flat</Button>
          </div>
        </div>
      </div>
    `,
  }),
};

// All variants showcase
export const AllVariants: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold mb-4">Intents</h3>
          <div class="flex gap-4 flex-wrap">
            <Button intent="primary">Primary</Button>
            <Button intent="secondary">Secondary</Button>
            <Button intent="danger">Danger</Button>
            <Button intent="flat">Flat</Button>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Sizes</h3>
          <div class="flex gap-4 items-center flex-wrap">
            <Button size="small">Small</Button>
            <Button size="medium">Medium</Button>
            <Button size="large">Large</Button>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Shapes</h3>
          <div class="flex gap-4 flex-wrap">
            <Button shape="rounded">Rounded</Button>
            <Button shape="rectangular">Rectangular</Button>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">States</h3>
          <div class="flex gap-4 flex-wrap">
            <Button>Normal</Button>
            <Button disabled>Disabled</Button>
            <Button :disable-animation="true">No Animation</Button>
          </div>
        </div>
      </div>
    `,
  }),
};

// Interactive playground
export const Playground: Story = {
  args: {
    intent: 'primary',
    size: 'large',
    shape: 'rounded',
    disabled: false,
    disableAnimation: false,
    default: 'Playground Button',
  },
};
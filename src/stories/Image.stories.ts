// src/stories/Image.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3';

import Image from '@/components/common/Image.vue';

// Adjust the path to your component

const meta: Meta<typeof Image> = {
  title: 'Components/Image',
  component: Image,
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'The URL of the image.',
    },
    fallbackSrc: {
      control: 'text',
      description: 'The URL of the image to display if the primary image fails to load.',
    },
    alt: {
      control: 'text',
      description: 'Alternative text for the image.',
    },
    width: {
      control: 'number',
      description: 'The width of the image in pixels.',
    },
    height: {
      control: 'number',
      description: 'The height of the image in pixels.',
    },
  },
  args: {
    // Default args for all stories
    alt: 'Placeholder image',
    width: 400,
    height: 250,
  },
};

export default meta;

type Story = StoryObj<typeof Image>;

export const Default: Story = {
  args: {
    src: 'https://via.placeholder.com/400x250?text=Default+Image',
  },
};

export const CustomSize: Story = {
  args: {
    src: 'https://via.placeholder.com/200x150?text=Custom+Size',
    width: 200,
    height: 150,
  },
};

export const WithFallback: Story = {
  args: {
    src: 'https://nonexistent-image-url.com/image.jpg', // This URL will fail
    fallbackSrc: 'https://via.placeholder.com/400x250?text=Fallback+Image+Loaded',
  },
};

export const NoSrcProvided: Story = {
  args: {
    src: '', // An empty string will also trigger the fallback
    fallbackSrc: 'https://via.placeholder.com/400x250?text=No+Src+Provided',
  },
};

export const WithExternalImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1682687982046-e5987063d40a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODU1ODd8MXwxfGFsbHwxfHx8fHx8Mnw&ixlib=rb-4.0.3&q=80&w=400',
    alt: 'Mountain landscape',
    width: 400,
    height: 250,
  },
};

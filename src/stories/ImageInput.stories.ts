import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import ImageInput from '../components/form/ImageInput.vue';

const meta: Meta<typeof ImageInput> = {
  title: 'Components/Form/ImageInput',
  component: ImageInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A specialized image input component with preview functionality, file validation, and replace capability. Features click-to-upload, image preview with hover overlay, camera icon for replacement, and comprehensive error handling.',
      },
    },
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Label text for the input field',
    },
    id: {
      control: { type: 'text' },
      description: 'Unique identifier for the input',
    },
    tipsText: {
      control: { type: 'text' },
      description: 'Help text describing file requirements',
    },
    showTips: {
      control: { type: 'boolean' },
      description: 'Whether to show the tips text',
    },
    maxSizeInMB: {
      control: { type: 'number' },
      description: 'Maximum file size in megabytes',
    },
    acceptedFormats: {
      control: { type: 'text' },
      description: 'Accepted MIME types (comma-separated)',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    label: 'Profile Picture',
    id: 'profile-pic',
  },
  render: (args) => ({
    components: { ImageInput },
    setup() {
      const selectedImage = ref<File | null>(null);
      const handleImageChange = (file: File | null) => {
        console.log('Image changed:', file?.name || 'No file');
      };
      const handleImageError = (error: string) => {
        console.log('Image error:', error);
      };
      return { args, selectedImage, handleImageChange, handleImageError };
    },
    template: `
      <div class="w-96">
        <ImageInput 
          v-bind="args" 
          v-model="selectedImage"
          @change="handleImageChange"
          @error="handleImageError"
        />
        <div v-if="selectedImage" class="mt-4 text-sm text-gray-600">
          <p><strong>Selected:</strong> {{ selectedImage.name }}</p>
          <p><strong>Size:</strong> {{ (selectedImage.size / 1024).toFixed(1) }}KB</p>
        </div>
      </div>
    `,
  }),
};

// Small image with custom size limit
export const SmallImage: Story = {
  args: {
    label: 'Avatar Image',
    id: 'avatar',
    maxSizeInMB: 1,
    tipsText: 'Upload a square image at least 150x150 pixels. Maximum 1MB.',
    showTips: true,
  },
  render: (args) => ({
    components: { ImageInput },
    setup() {
      const selectedImage = ref<File | null>(null);
      return { args, selectedImage };
    },
    template: `
      <div class="w-96">
        <ImageInput v-bind="args" v-model="selectedImage" />
      </div>
    `,
  }),
};

// Large image upload
export const LargeImage: Story = {
  args: {
    label: 'Cover Photo',
    id: 'cover-photo',
    maxSizeInMB: 10,
    tipsText: 'Upload a high-resolution image at least 1920x1080 pixels. Maximum 10MB.',
    showTips: true,
  },
  render: (args) => ({
    components: { ImageInput },
    setup() {
      const selectedImage = ref<File | null>(null);
      return { args, selectedImage };
    },
    template: `
      <div class="w-96">
        <ImageInput v-bind="args" v-model="selectedImage" />
      </div>
    `,
  }),
};

// WebP support
export const WebPSupport: Story = {
  args: {
    label: 'Modern Image Upload',
    id: 'webp-image',
    acceptedFormats: 'image/jpeg,image/png,image/webp',
    tipsText: 'Supports JPEG, PNG, and WebP formats. Maximum 5MB.',
    showTips: true,
    maxSizeInMB: 5,
  },
  render: (args) => ({
    components: { ImageInput },
    setup() {
      const selectedImage = ref<File | null>(null);
      return { args, selectedImage };
    },
    template: `
      <div class="w-96">
        <ImageInput v-bind="args" v-model="selectedImage" />
      </div>
    `,
  }),
};

// Without tips
export const NoTips: Story = {
  args: {
    label: 'Simple Image Upload',
    id: 'simple-image',
    showTips: false,
  },
  render: (args) => ({
    components: { ImageInput },
    setup() {
      const selectedImage = ref<File | null>(null);
      return { args, selectedImage };
    },
    template: `
      <div class="w-96">
        <ImageInput v-bind="args" v-model="selectedImage" />
      </div>
    `,
  }),
};

// PNG only
export const PNGOnly: Story = {
  args: {
    label: 'Logo Upload (PNG Only)',
    id: 'logo-png',
    acceptedFormats: 'image/png',
    tipsText: 'PNG format only for transparent backgrounds. Maximum 2MB.',
    showTips: true,
    maxSizeInMB: 2,
  },
  render: (args) => ({
    components: { ImageInput },
    setup() {
      const selectedImage = ref<File | null>(null);
      return { args, selectedImage };
    },
    template: `
      <div class="w-96">
        <ImageInput v-bind="args" v-model="selectedImage" />
      </div>
    `,
  }),
};

// Interactive example with error handling
export const Interactive: Story = {
  args: {
    label: 'Interactive Image Upload',
    id: 'interactive-image',
    maxSizeInMB: 3,
    tipsText: 'Try uploading different file types and sizes to see validation in action.',
    showTips: true,
  },
  render: (args) => ({
    components: { ImageInput },
    setup() {
      const selectedImage = ref<File | null>(null);
      const errorMessage = ref('');
      const successMessage = ref('');

      const handleImageChange = (file: File | null) => {
        errorMessage.value = '';
        if (file) {
          successMessage.value = `Successfully selected: ${file.name}`;
          setTimeout(() => {
            successMessage.value = '';
          }, 3000);
        } else {
          successMessage.value = '';
        }
      };

      const handleImageError = (error: string) => {
        errorMessage.value = error;
        successMessage.value = '';
        setTimeout(() => {
          errorMessage.value = '';
        }, 5000);
      };

      return { args, selectedImage, errorMessage, successMessage, handleImageChange, handleImageError };
    },
    template: `
      <div class="w-96 space-y-4">
        <ImageInput 
          v-bind="args" 
          v-model="selectedImage"
          @change="handleImageChange"
          @error="handleImageError"
        />
        
        <div v-if="errorMessage" class="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-red-600 text-sm">{{ errorMessage }}</p>
        </div>
        
        <div v-if="successMessage" class="p-3 bg-green-50 border border-green-200 rounded-lg">
          <p class="text-green-600 text-sm">{{ successMessage }}</p>
        </div>
        
        <div v-if="selectedImage" class="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 class="font-medium text-sm text-blue-800">File Details:</h4>
          <ul class="text-sm text-blue-600 mt-1 space-y-1">
            <li><strong>Name:</strong> {{ selectedImage.name }}</li>
            <li><strong>Size:</strong> {{ (selectedImage.size / 1024).toFixed(1) }}KB</li>
            <li><strong>Type:</strong> {{ selectedImage.type }}</li>
            <li><strong>Last Modified:</strong> {{ new Date(selectedImage.lastModified).toLocaleString() }}</li>
          </ul>
        </div>
      </div>
    `,
  }),
};

// Pre-loaded image example
export const PreLoaded: Story = {
  args: {
    label: 'Edit Profile Picture',
    id: 'edit-profile',
    tipsText: 'Click the camera icon to replace the current image.',
    showTips: true,
  },
  render: (args) => ({
    components: { ImageInput },
    setup() {
      const selectedImage = ref<File | null>(null);
      
      // Simulate a pre-loaded image by creating a File object
      // In real usage, this would come from your data store
      const createMockFile = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 100;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#4f46e5';
          ctx.fillRect(0, 0, 100, 100);
          ctx.fillStyle = 'white';
          ctx.font = '20px Arial';
          ctx.textAlign = 'center';
          ctx.fillText('DEMO', 50, 55);
        }
        
        return new Promise<File>((resolve) => {
          canvas.toBlob((blob) => {
            if (blob) {
              const file = new File([blob], 'demo-image.png', { type: 'image/png' });
              resolve(file);
            }
          });
        });
      };

      // Set initial image
      createMockFile().then(file => {
        selectedImage.value = file;
      });

      return { args, selectedImage };
    },
    template: `
      <div class="w-96">
        <ImageInput v-bind="args" v-model="selectedImage" />
        <p class="text-xs text-gray-500 mt-2">
          This example shows how the component looks with a pre-loaded image. 
          Hover over the image to see the replace functionality.
        </p>
      </div>
    `,
  }),
};

// All variants showcase
export const AllVariants: Story = {
  render: () => ({
    components: { ImageInput },
    setup() {
      const avatar = ref<File | null>(null);
      const cover = ref<File | null>(null);
      const logo = ref<File | null>(null);
      const simple = ref<File | null>(null);
      return { avatar, cover, logo, simple };
    },
    template: `
      <div class="space-y-8 w-full max-w-4xl">
        <div>
          <h3 class="text-lg font-semibold mb-4">Avatar Upload (Small)</h3>
          <div class="w-96">
            <ImageInput 
              v-model="avatar"
              label="Profile Avatar"
              id="avatar-demo"
              :max-size-in-m-b="1"
              tips-text="Square image recommended, 150x150px minimum. Max 1MB."
              :show-tips="true"
            />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Cover Photo (Large)</h3>
          <div class="w-96">
            <ImageInput 
              v-model="cover"
              label="Cover Image"
              id="cover-demo"
              :max-size-in-m-b="10"
              tips-text="High-resolution image, 1920x1080px recommended. Max 10MB."
              :show-tips="true"
            />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Logo Upload (PNG Only)</h3>
          <div class="w-96">
            <ImageInput 
              v-model="logo"
              label="Company Logo"
              id="logo-demo"
              accepted-formats="image/png"
              :max-size-in-m-b="2"
              tips-text="PNG format only for transparent backgrounds. Max 2MB."
              :show-tips="true"
            />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Simple Upload (No Tips)</h3>
          <div class="w-96">
            <ImageInput 
              v-model="simple"
              label="Simple Image"
              id="simple-demo"
              :show-tips="false"
            />
          </div>
        </div>
      </div>
    `,
  }),
}; 
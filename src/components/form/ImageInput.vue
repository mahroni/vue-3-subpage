<template>
  <div :class="containerClasses()">
    <label :for="id" class="text-text-subtitle text-sm font-normal">{{ label }}</label>
    <!-- Upload Area -->
    <div
      @click="triggerFileInput"
      class="mt-2 flex w-fit cursor-pointer items-center rounded-lg border border-dashed p-1.5 transition-colors"
      :class="[
        error
          ? 'border-red-500 bg-red-50'
          : 'border-green-500 hover:border-green-600 hover:bg-green-50',
        props.isUploading ? 'cursor-not-allowed opacity-50' : '',
      ]"
    >
      <!-- Show uploaded image preview if available -->
      <div v-if="previewUrl" class="group relative">
        <img
          :src="previewUrl"
          :alt="fileName"
          class="max-h-[68px] min-h-[68px] max-w-[68px] min-w-[68px] rounded-lg object-cover"
        />
        <button
          @click.stop="triggerFileInput"
          class="absolute inset-0 flex items-center justify-center rounded-lg bg-white text-[#0a0a0a] opacity-0 shadow-lg transition-all duration-200 group-hover:cursor-pointer group-hover:opacity-60"
          type="button"
          title="Replace image"
        >
          <div v-if="props.isUploading" class="opacity-100">
            <svg
              class="h-5 w-5 animate-spin text-green-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="m12 2a10 10 0 0 1 10 10h-2a8 8 0 0 0-8-8v-2z"
              ></path>
            </svg>
          </div>
          <!-- <CameraIcon :size="20" /> -->
        </button>
      </div>

      <!-- Upload icon when no image -->
      <div
        v-else
        class="m-2.5 flex w-fit items-center justify-center rounded-lg bg-green-200 p-[14px]"
      >
        <div v-if="props.isUploading" class="relative">
          <svg
            class="h-5 w-5 animate-spin text-green-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="m12 2a10 10 0 0 1 10 10h-2a8 8 0 0 0-8-8v-2z"
            ></path>
          </svg>
        </div>
        <Icon v-else name="plus" :size="20" class="text-green-600" />
      </div>
    </div>

    <!-- Hidden file input -->
    <input
      ref="fileInput"
      type="file"
      :id="id"
      :accept="acceptedFormats"
      @change="handleFileChange"
      class="hidden"
      :disabled="props.isUploading"
    />
  </div>
</template>

<script lang="ts" setup>
import { cva } from 'class-variance-authority';
import { computed, ref, watch } from 'vue';

import { Icon } from '@/components/icons';

interface Props {
  id: string;
  label?: string;
  maxSizeInMB?: number;
  acceptedFormats?: string;
  modelValue?: string | null;
  isUploading?: boolean;
}

interface Emits {
  (e: 'update:modelValue', value: string | null): void;
  (e: 'upload', file: File, revertPreview: () => void): void;
  (e: 'error', error: string): void;
}

const containerClasses = cva('space-y-1');

const props = withDefaults(defineProps<Props>(), {
  label: 'Label',
  id: 'image-input',
  maxSizeInMB: 2,
  acceptedFormats: 'image/jpeg,image/jpg,image/png',
  modelValue: null,
  isUploading: false,
});

const emit = defineEmits<Emits>();

// Reactive state
const fileInput = ref<HTMLInputElement>();
const previewUrl = ref<string>('');
const previousPreviewUrl = ref<string>('');
const fileName = ref<string>('');
const fileSize = ref<number>(0);
const error = ref<string>('');

// Computed properties
const maxSizeInBytes = computed(() => props.maxSizeInMB * 1024 * 1024);

// Methods
const triggerFileInput = () => {
  if (props.isUploading) return;
  fileInput.value?.click();
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) return;

  // Reset previous error
  error.value = '';

  // Validate file
  const validationError = validateFile(file);
  if (validationError) {
    error.value = validationError;
    emit('error', validationError);
    return;
  }

  // Store previous preview URL
  previousPreviewUrl.value = previewUrl.value;

  // Set file info
  fileName.value = file.name;
  fileSize.value = file.size;

  // Create preview and emit file for upload
  const reader = new FileReader();
  reader.onload = (e) => {
    const dataUrl = e.target?.result as string;
    previewUrl.value = dataUrl;
    console.log(dataUrl, 'dataUrl');
  };
  reader.readAsDataURL(file);

  // Revert function to restore previous preview
  const revertPreview = () => {
    previewUrl.value = previousPreviewUrl.value;
    fileName.value = previousPreviewUrl.value ? 'Current image' : '';
    fileSize.value = 0;
  };

  // Emit the raw file for server upload with revert function
  console.log(file, 'file');
  console.log(previewUrl.value, 'previewUrl');
  emit('upload', file, revertPreview);
};

const validateFile = (file: File): string => {
  // Check file type
  const acceptedTypes = props.acceptedFormats.split(',').map((type) => type.trim());
  if (!acceptedTypes.includes(file.type)) {
    return `Invalid file format. Please upload ${acceptedTypes.join(', ')} files only.`;
  }

  // Check file size
  if (file.size > maxSizeInBytes.value) {
    return `File size exceeds ${props.maxSizeInMB}MB limit.`;
  }

  return '';
};

// Watch for changes to modelValue and update preview
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      console.log(newValue, 'newValue');
      previewUrl.value = newValue;
      fileName.value = 'Current image';
      fileSize.value = 0;
    } else {
      previewUrl.value = '';
      fileName.value = '';
      fileSize.value = 0;
    }
  },
  { immediate: true }
);
</script>

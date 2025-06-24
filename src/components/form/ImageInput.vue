<template>
    <div :class="containerClasses()">
        <label :for="id" class="text-sm font-normal text-text-subtitle">{{ label }}</label>
        <div class="flex gap-4 mt-2">
            <!-- Upload Area -->
            <div 
                @click="triggerFileInput" 
                class="flex items-center p-4 border rounded-lg border-dashed w-fit cursor-pointer transition-colors"
                :class="[
                    error ? 'border-red-500 bg-red-50' : 'border-green-500 hover:border-green-600 hover:bg-green-50',
                    isUploading ? 'opacity-50 cursor-not-allowed' : ''
                ]"
            >
                <!-- Show uploaded image preview if available -->
                <div v-if="previewUrl" class="relative group">
                    <img 
                        :src="previewUrl" 
                        :alt="fileName" 
                        class="min-w-[48px] min-h-[48px] max-w-[48px] max-h-[48px] object-cover rounded-lg"
                    />
                    <button 
                        @click.stop="triggerFileInput"
                        class="absolute inset-0 bg-white text-[#0a0a0a] rounded-lg flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-60 group-hover:cursor-pointer shadow-lg"
                        type="button"
                        title="Replace image"
                    >
                        <CameraIcon :size="20" />
                    </button>
                </div>
                
                <!-- Upload icon when no image -->
                <div v-else class="p-[14px] bg-green-200 rounded-lg flex items-center justify-center w-fit">
                    <PlusIcon size="20" color="#27b199" />
                </div>
            </div>

            <!-- Tips and Error Messages -->
            <div class="flex flex-col gap-1">
                <p v-if="showTips && !error" class="text-xs text-[#A0A0A0]">
                    {{ tipsText }}
                </p>
                <p v-if="error" class="text-xs text-red-500">
                    {{ error }}
                </p>
                <p v-if="fileName && !error" class="text-xs text-green-600">
                    {{ fileName }} ({{ formatFileSize(fileSize) }})
                </p>
                <p v-if="isUploading" class="text-xs text-blue-500">
                    Uploading...
                </p>
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
            :disabled="isUploading"
        />
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { CameraIcon, PlusIcon } from '../icons';
import { cva } from 'class-variance-authority';

interface Props {
    label: string;
    id: string;
    tipsText?: string;
    showTips?: boolean;
    maxSizeInMB?: number;
    acceptedFormats?: string;
    modelValue?: File | null;
}

interface Emits {
    (e: 'update:modelValue', value: File | null): void;
    (e: 'change', value: File | null): void;
    (e: 'error', error: string): void;
}

const containerClasses = cva('space-y-1');

const props = withDefaults(defineProps<Props>(), {
    label: 'Label',
    id: 'image-input',
    tipsText: 'We recommend an image of at least 360x360 pixels. You can upload images in JPG, JPEG, or PNG format with a maximum size of 2MB.',
    showTips: true,
    maxSizeInMB: 2,
    acceptedFormats: 'image/jpeg,image/jpg,image/png',
    modelValue: null,
});

const emit = defineEmits<Emits>();

// Reactive state
const fileInput = ref<HTMLInputElement>();
const previewUrl = ref<string>('');
const fileName = ref<string>('');
const fileSize = ref<number>(0);
const error = ref<string>('');
const isUploading = ref<boolean>(false);

// Computed properties
const maxSizeInBytes = computed(() => props.maxSizeInMB * 1024 * 1024);

// Methods
const triggerFileInput = () => {
    if (isUploading.value) return;
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
    
    // Set file info
    fileName.value = file.name;
    fileSize.value = file.size;
    
    // Create preview
    createPreview(file);
    
    // Emit the file
    emit('update:modelValue', file);
    emit('change', file);
};

const validateFile = (file: File): string => {
    // Check file type
    const acceptedTypes = props.acceptedFormats.split(',').map(type => type.trim());
    if (!acceptedTypes.includes(file.type)) {
        return `Invalid file format. Please upload ${acceptedTypes.join(', ')} files only.`;
    }
    
    // Check file size
    if (file.size > maxSizeInBytes.value) {
        return `File size exceeds ${props.maxSizeInMB}MB limit.`;
    }
    
    return '';
};

const createPreview = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        previewUrl.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
};

const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Initialize with existing modelValue
if (props.modelValue) {
    fileName.value = props.modelValue.name;
    fileSize.value = props.modelValue.size;
    createPreview(props.modelValue);
}

</script>
<template>
    <div :class="containerClasses">
        <label v-if="label" :for="id" class="text-sm font-medium text-text-subtitle mb-2 block">
            {{ label }}
        </label>
        <div
            :class="dropZoneClasses"
            @drop="handleDrop"
            @dragover="handleDragOver"
            @dragenter="handleDragEnter"
            @dragleave="handleDragLeave"
            @click="triggerFileInput"
        >
            <input
                ref="fileInput"
                :id="id"
                type="file"
                :multiple="multiple"
                :accept="accept"
                @change="handleFileSelect"
                class="hidden"
            />
            
            <!-- Upload Icon -->
            <div class="flex flex-col items-center justify-center py-6">
                <UploadIcon :size="32" class="text-gray-400 mb-2" />
                <div class="text-center">
                    <p class="text-sm text-gray-600 mb-1">
                        Drag and Drop file here or
                        <span class="font-medium text-primary cursor-pointer hover:underline">
                            Choose File
                        </span>
                    </p>
                </div>
            </div>
        </div>

        <!-- details -->
         <div class="flex justify-between items-center mt-2">
            <span class="text-xs font-normal text-[#A0A0A0]">Supported File: {{ acceptText || 'PNG, JPG, GIF up to 10MB' }}</span>
            <span class="text-xs font-normal text-[#A0A0A0]">Maximum Size: {{ formatFileSize(maxSize) }}</span>
         </div>
        
        <!-- File List -->
        <div v-if="files.length > 0" class="mt-4 space-y-2">
            <div
                v-for="(file, index) in files"
                :key="index"
                class="flex items-center justify-between p-3 bg-transparent rounded-lg border border-[#BFBFBF]"
            >
                <div class="flex items-center space-x-3">
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                        <p class="text-sm font-medium text-gray-900">{{ file.name }}</p>
                        <p class="text-xs text-gray-500">{{ formatFileSize(file.size) }}</p>
                    </div>
                </div>
                <button
                    @click="removeFile(index)"
                    class="text-red-500 hover:text-red-700 p-1  flex items-center justify-center hover:cursor-pointer"
                    type="button"
                >
                    <ErrorIcon :size="24" class="text-red-500" />
                </button>
            </div>
        </div>
        
        <!-- Error Message -->
        <p v-if="error && errorMessage" class="text-danger text-sm font-normal mt-2">
            {{ errorMessage }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import UploadIcon from '../icons/UploadIcon.vue';
import ErrorIcon from '../icons/ErrorIcon.vue';

interface Props {
    modelValue?: File[]
    label?: string
    id?: string
    multiple?: boolean
    accept?: string
    acceptText?: string
    maxSize?: number // in bytes
    maxFiles?: number
    error?: boolean
    errorMessage?: string
    disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: () => [],
    label: '',
    id: 'drag-drop-input',
    multiple: false,
    accept: 'image/*',
    acceptText: '',
    maxSize: 10 * 1024 * 1024, // 10MB
    maxFiles: 5,
    error: false,
    errorMessage: '',
    disabled: false
})

const emit = defineEmits<{
    (e: 'update:modelValue', files: File[]): void
    (e: 'error', message: string): void
}>()

const fileInput = ref<HTMLInputElement>()
const isDragOver = ref(false)
const files = ref<File[]>(props.modelValue || [])

const containerClasses = computed(() => [
    'w-full',
    { 'opacity-50 pointer-events-none': props.disabled }
])

const dropZoneClasses = computed(() => [
    'border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 border-green-500',
    {
        'border-primary bg-primary/5': isDragOver.value,
        'border-gray-300 hover:border-gray-400': !isDragOver.value && !props.error,
        'border-red-300 bg-red-50': props.error,
    }
])

const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
}

const handleDragEnter = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    isDragOver.value = true
}

const handleDragLeave = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    isDragOver.value = false
}

const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    isDragOver.value = false
    
    const droppedFiles = Array.from(e.dataTransfer?.files || [])
    processFiles(droppedFiles)
}

const triggerFileInput = () => {
    if (!props.disabled) {
        fileInput.value?.click()
    }
}

const handleFileSelect = (e: Event) => {
    const target = e.target as HTMLInputElement
    const selectedFiles = Array.from(target.files || [])
    processFiles(selectedFiles)
}

const processFiles = (newFiles: File[]) => {
    let validFiles = [...files.value]
    
    for (const file of newFiles) {
        // Check file size
        if (file.size > props.maxSize) {
            emit('error', `File "${file.name}" is too large. Maximum size is ${formatFileSize(props.maxSize)}.`)
            continue
        }
        
        // Check file type
        if (props.accept && !isFileTypeAccepted(file)) {
            emit('error', `File "${file.name}" is not an accepted file type.`)
            continue
        }
        
        // Check max files limit
        if (!props.multiple && validFiles.length >= 1) {
            validFiles = [file] // Replace existing file
            break
        } else if (validFiles.length >= props.maxFiles) {
            emit('error', `Maximum ${props.maxFiles} files allowed.`)
            break
        }
        
        validFiles.push(file)
    }
    
    files.value = validFiles
    emit('update:modelValue', validFiles)
}

const isFileTypeAccepted = (file: File): boolean => {
    if (!props.accept) return true
    
    const acceptedTypes = props.accept.split(',').map(type => type.trim())
    
    return acceptedTypes.some(type => {
        if (type.startsWith('.')) {
            return file.name.toLowerCase().endsWith(type.toLowerCase())
        }
        if (type.includes('*')) {
            const [mainType] = type.split('/')
            return file.type.startsWith(mainType || '')
        }
        return file.type === type
    })
}

const removeFile = (index: number) => {
    files.value.splice(index, 1)
    emit('update:modelValue', files.value)
}

const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
</script> 
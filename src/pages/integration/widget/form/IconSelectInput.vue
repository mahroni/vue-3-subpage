<script setup lang="ts">
import { Icon } from '@/components/icons';
import { cva } from 'class-variance-authority';

interface Props {
    modelValue: string;
    icons: Icon[]
}

interface Icon {
    name: string;
    icon: string;
}

const props = defineProps<Props>();

const emit = defineEmits(['update:modelValue']);
const iconClasses = cva('flex items-center justify-center p-3 rounded-lg cursor-pointer transition-all duration-200 border', {
    variants: {
        selected: {
            true: 'border-primary',
            false: 'border-gray-300 hover:border-gray-400'
        }
    }
});

const getIconClasses = (iconName: string) => iconClasses({ selected: props.modelValue === iconName });

const selectIcon = (iconName: string) => {
    if (iconName !== props.modelValue) {
        emit('update:modelValue', iconName);
    } else {
        emit('update:modelValue', '');
    }
};
</script>

<template>
    <div class="flex flex-col gap-2">
        <label>Icon Field</label>

        <div class="flex gap-3 flex-wrap">
            <div v-for="icon in props.icons" :key="icon.name" :class="getIconClasses(icon.name)"
                @click="selectIcon(icon.name)" :title="icon.name">
                <Icon :name="icon.icon" :alt="icon.name" />
            </div>
        </div>
    </div>
</template>
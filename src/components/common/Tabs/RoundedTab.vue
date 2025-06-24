<script setup lang="ts">
import type { Component } from 'vue'

interface Tab {
    label: string;
    icon?: Component;
}

const props = withDefaults(defineProps<{
    tabs: Tab[];
    modelValue: string;
}>(), {
    modelValue: ''
})

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>()

const handleTabClick = (tab: string) => {
    emit('update:modelValue', tab);
}
</script>

<template>
    <ul class="flex w-fit select-none gap-1 items-center">
        <li v-for="tab in tabs" :key="tab.label" @click="handleTabClick(tab.label)" @keydown.enter="handleTabClick(tab.label)"
            @keydown.space="handleTabClick(tab.label)" :tabindex="0" role="tab" :aria-selected="props.modelValue === tab.label"
            :aria-controls="`tab-panel-${tab.label}`"
            class="cursor-pointer text-text-title px-3 py-2 transition-all duration-200 ease-out flex gap-2 items-center rounded-full border-[1px]"
            :class="[modelValue === tab.label ? 'bg-soft-green border-[#27B199]' : 'border-transparent bg-transparent']">
            <span v-if="tab.icon">
                <component :is="tab.icon" :size="24" :class="props.modelValue === tab.label ? 'text-[#27B199]' : 'text-text-title'" />
            </span>
            <span :class="props.modelValue === tab.label ? 'text-[#27B199]' : 'text-text-title'">{{ tab.label }}</span>
        </li>
    </ul>
</template>
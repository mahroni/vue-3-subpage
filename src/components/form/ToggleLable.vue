<template>
    <div class="flex items-center gap-2 w-full justify-between">
        <label class="text-base font-semibold text-text-subtitle">{{ label }}</label>
        <Switch size="large" v-model="modelValue" variant="success" />
    </div>
</template>

<script lang="ts" setup>
import Switch from '../common/Switch.vue';
import { computed } from 'vue';

const props = defineProps<{
    modelValue: boolean;
    label: string;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
}>();

const modelValue = computed({
    get: () => props.modelValue,
    set: (value: boolean) => emit('update:modelValue', value)
});
</script>
<template>
    <div class="flex gap-4 w-full p-4">
        <div class="flex flex-col gap-4 bg-gray-200 w-1/2 p-6 border-[1px] border-gray-300 rounded-2xl">
            <div class="flex items-center gap-2 w-full justify-between">
                <label class="text-base font-semibold text-text-subtitle">{{ label }}</label>
                <Switch v-if="isSwitch" size="large" v-model="modelValue" variant="success" />
            </div>
            <Divider v-if="modelValue || $slots['additional-info']" />
            <slot name="additional-info" />
            <div class="flex flex-col gap-6" v-if="modelValue || !isSwitch">
                <slot name="inputs" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Switch from '@/components/common/Switch.vue';
import Divider from '@/components/ui/Divider.vue';
import { computed } from 'vue';

const props = defineProps<{
    label: string;
    modelValue?: boolean;
    isSwitch?: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
}>();

const modelValue = computed({
    get: () => props.modelValue,
    set: (value: boolean) => emit('update:modelValue', value)
});
</script>
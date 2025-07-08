<template>
  <div :class="containerClasses()">
    <label v-if="label" :class="computedLabelClasses">
      {{ label }}
    </label>
    <div class="mt-4 flex flex-col gap-4">
      <div v-for="option in options" :key="getOptionValue(option)" class="flex items-center">
        <input
          :id="`${id}-${getOptionValue(option)}`"
          :name="name || id"
          :value="getOptionValue(option)"
          :checked="modelValue === getOptionValue(option)"
          type="radio"
          class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          @change="handleChange"
        />
        <label
          :for="`${id}-${getOptionValue(option)}`"
          class="ml-2 cursor-pointer text-sm text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {{ getOptionLabel(option) }}
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cva } from 'class-variance-authority';
import { computed } from 'vue';

interface RadioOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface Props {
  id?: string;
  name?: string;
  label?: string;
  options: RadioOption[] | string[] | number[];
  modelValue?: string | number;
  disabled?: boolean;
}

interface Emits {
  (e: 'update:modelValue', value: string | number): void;
  (e: 'change', value: string | number): void;
}

const props = withDefaults(defineProps<Props>(), {
  id: 'radio-input',
  label: '',
  disabled: false,
  name: '',
  modelValue: '',
  options: () => [],
});

const containerClasses = cva('space-y-1');
const labelClasses = cva('text-sm font-normal text-[#A0A0A0]', {
  variants: {
    disabled: {
      true: 'opacity-60 cursor-not-allowed',
    },
  },
});

const emit = defineEmits<Emits>();

const getOptionValue = (option: RadioOption | string | number): string | number => {
  if (typeof option === 'object' && option !== null) {
    return option.value;
  }
  return option;
};

const getOptionLabel = (option: RadioOption | string | number): string => {
  if (typeof option === 'object' && option !== null) {
    return option.label;
  }
  return String(option);
};

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = isNaN(Number(target.value)) ? target.value : Number(target.value);

  emit('update:modelValue', value);
  emit('change', value);
};

const computedLabelClasses = computed(() => labelClasses({ disabled: props.disabled }));
</script>

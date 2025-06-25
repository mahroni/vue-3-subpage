<template>
  <div :class="containerClasses()">
    <label v-if="label" :for="id" :class="computedLabelClasses">
      {{ label }}
    </label>
    <div :class="computedSelectWrapperClasses">
      <select :id="id" :value="selectedValue" @change="handleChange" :class="computedSelectClasses"
        :disabled="disabled">
        <option value="" disabled selected>{{ placeholder }}</option>
        <option v-for="option in options" :key="option.value" :value="option.value" class="text-gray-900">
          {{ option.text }}
        </option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <ChevronDownIcon class="w-5 h-5" />
      </div>
    </div>
    <p v-if="error" class="text-danger mt-2 text-sm font-normal">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { ChevronDownIcon } from '@/components/icons'; // Assuming this path is correct
import { cva } from 'class-variance-authority'; // Import cva

interface SelectOption {
  value: string | number;
  text: string;
}

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  options: {
    type: Array as () => SelectOption[],
    required: true,
    validator: (value: unknown[]) => value.every(option =>
      typeof option === 'object' && option !== null && 'value' in option && 'text' in option
    ),
  },
  label: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: () => 'custom-select-' + Math.random().toString(36).substring(2, 9),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Select an option',
  },
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

const { modelValue } = toRefs(props);

const selectedValue = computed<string | number>({
  get: () => modelValue.value,
  set: (newValue) => {
    emit('update:modelValue', newValue);
  },
});

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  selectedValue.value = target.value;
};

// CVA classes for styling
const containerClasses = cva('mb-4');

const labelClasses = cva('block text-sm font-medium text-gray-700 mb-1 rounded-md', {
  variants: {
    disabled: {
      true: 'opacity-60 cursor-not-allowed',
    },
  },
});

const selectWrapperClasses = cva('relative', {
  // Add any wrapper-specific variants here if needed
});

const selectClasses = cva(
  'block w-full border rounded-md shadow-sm sm:text-sm appearance-none px-4 py-3',
  {
    variants: {
      disabled: {
        true: 'cursor-not-allowed !text-[#A0A0A0] !bg-surface-disable',
        false: 'bg-white text-gray-900',
      },
      error: {
        true: '!ring-1 !ring-danger focus:!ring-danger border-danger',
      },
    },
    defaultVariants: {
      disabled: false,
      error: false,
    },
    compoundVariants: [
      {
        disabled: false,
        error: false,
        class: 'border-gray-300 focus:ring-primary focus:border-primary',
      },
    ],
  }
);

// Computed properties to apply disabled and error states to CVA classes
const computedLabelClasses = computed(() => labelClasses({ disabled: props.disabled }));
const computedSelectWrapperClasses = computed(() =>
  selectWrapperClasses({ /* no specific variants for wrapper yet */ })
);
const computedSelectClasses = computed(() =>
  selectClasses({
    disabled: props.disabled,
    error: props.error,
  })
);
</script>

<style scoped></style>
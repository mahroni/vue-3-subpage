<template>
  <div :class="containerClasses()">
    <label v-if="label" :for="id" :class="labelClasses({ disabled })">{{ label }}</label>
    <div :class="wrapperClasses({ isFocused, error, disabled })">
      <div :class="contentWrapperClasses()">
        <slot name="suffix-icon" />
        <input
          v-bind="$attrs"
          :id="id"
          :type="currentType"
          :class="inputClasses({ disabled })"
          :value="modelValue"
          @input="onInput"
          @focus="isFocused = true"
          @blur="isFocused = false"
          :placeholder="placeholder"
          :disabled="disabled"
        />

        <button
          v-if="clearable"
          class="invisible cursor-pointer transition-colors duration-300 ease-in-out"
          :class="{
            visible: modelValue,
          }"
          @click="onClear"
          :disabled="disabled"
        >
          <CloseIcon :size="20" class="h-5 w-5 text-[#A0A0A0] hover:text-[#0A0A0A]" />
        </button>

        <button
          v-if="type === 'password'"
          class="cursor-pointer"
          @click="togglePasswordVisibility"
          :disabled="disabled"
        >
          <EyeIcon class="h-5 w-5 text-[#A0A0A0] hover:text-[#0A0A0A]" />
        </button>
      </div>

      <button v-if="$slots['append-button']" :class="appendButtonClasses({ disabled })">
        <slot name="append-button" :disabled="disabled"></slot>
      </button>

      <button v-if="$slots['append-button-icon']" :class="appendButtonIconClasses({ disabled })">
        <slot name="append-button-icon" :disabled="disabled"></slot>
      </button>
    </div>
    <p v-if="error" class="text-danger mt-2 text-sm font-normal">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { cva } from 'class-variance-authority';
import { computed, ref } from 'vue';

import { CloseIcon, EyeIcon } from '../icons';

interface Props {
  modelValue: string;
  label?: string;
  placeholder?: string;
  id?: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  clearable?: boolean;
  type?: 'text' | 'password' | 'number';
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  placeholder: '',
  id: 'channel-name-input',
  disabled: false,
  error: false,
  errorMessage: 'This field has an error',
  clearable: false,
  type: 'text',
});

const emit = defineEmits(['update:modelValue']);

const isFocused = ref(false);
const showPassword = ref(false);

const currentType = computed(() =>
  props.type === 'password' && !showPassword.value ? 'password' : props.type
);

const onInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
};

const onClear = () => {
  emit('update:modelValue', '');
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

// --- CVA Classes ---

const containerClasses = cva('space-y-1');

const labelClasses = cva('text-sm font-normal text-text-subtitle', {
  variants: {
    disabled: {
      true: 'cursor-not-allowed opacity-60',
    },
  },
});

const wrapperClasses = cva(
  'relative mt-2 flex flex-row overflow-hidden rounded-lg border border-gray-300 shadow-small',
  {
    variants: {
      isFocused: {
        true: 'border-primary',
      },
      error: {
        true: 'border-red-500',
      },
      disabled: {
        true: 'bg-surface-disable text-[#A0A0A0]',
      },
    },
    compoundVariants: [
      {
        isFocused: true,
        error: true,
        class: 'border-red-500', // Error overrides focus border
      },
    ],
  }
);

const contentWrapperClasses = cva('flex w-full flex-row items-center gap-3 px-3 py-3 bg-white');

const inputClasses = cva('w-full bg-white outline-none text-sm placeholder:text-[#A0A0A0]', {
  variants: {
    disabled: {
      true: 'cursor-not-allowed',
    },
  },
});

const appendButtonClasses = cva(
  'flex min-w-fit cursor-pointer items-center justify-center gap-2 border-l border-gray-300 bg-[#FAFAFA] px-3 py-2 text-sm font-medium',
  {
    variants: {
      disabled: {
        true: 'bg-surface-disable text-[#A0A0A0]',
        false: 'bg-[#FAFAFA] text-[#0A0A0A]',
      },
    },
  }
);

const appendButtonIconClasses = cva(
  'flex min-w-fit cursor-pointer items-center justify-center bg-white p-4',
  {
    variants: {
      disabled: {
        true: 'text-[#A0A0A0]',
        false: 'text-primary',
      },
    },
  }
);
</script>

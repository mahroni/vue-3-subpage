<template>
  <button :class="buttonClass">
    <slot></slot>
  </button>
</template>
<script lang="ts" setup>
import { cva } from 'class-variance-authority';
import { computed } from 'vue';

interface ButtonIconProps {
  size?: 'small' | 'medium' | 'large';
  intent?: 'primary' | 'secondary';
  disabled?: boolean;
}

const props = withDefaults(defineProps<ButtonIconProps>(), {
  size: 'medium',
  intent: 'primary',
  disabled: false,
});

const buttonClass = computed(() =>
  cva('flex h-8 w-8 cursor-pointer items-center justify-center rounded-full', {
    variants: {
      size: {
        small: 'h-6 w-6',
        medium: 'h-8 w-8',
        large: 'h-10 w-10',
      },
      intent: {
        primary: 'text-primary hover:bg-primary-hover/10 active:bg-primary-hover/20',
        secondary: 'text-gray-500 hover:bg-gray-100 active:bg-gray-200',
      },
      disabled: {
        true: 'cursor-not-allowed opacity-50 pointer-events-none',
        false: 'cursor-pointer',
      },
    },
    defaultVariants: {
      size: 'medium',
      intent: 'primary',
      disabled: false,
    },
  })({
    size: props.size,
    intent: props.intent,
    disabled: props.disabled,
  })
);
</script>

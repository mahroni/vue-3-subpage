<template>
  <button :class="buttonClass">
    <slot></slot>
  </button>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { cva } from 'class-variance-authority';

interface ButtonIconProps {
  size?: 'small' | 'medium' | 'large';
  intent?: 'primary' | 'secondary';
}

const props = withDefaults(defineProps<ButtonIconProps>(), {
  size: 'medium',
  intent: 'primary',
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
    },
    defaultVariants: {
      size: 'medium',
      intent: 'primary',
    },
  })({
    size: props.size,
    intent: props.intent,
  })
);
</script>

<script setup lang="ts">
import { cva } from 'class-variance-authority';
import { computed } from 'vue';

interface ButtonProps {
  intent?: 'primary' | 'secondary' | 'danger' | 'flat';
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  disabled?: boolean;
  shape?: 'rounded' | 'rectangular';
  to?: string;
  type?: 'button' | 'submit' | 'reset';
  disableAnimation?: boolean;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  intent: 'primary',
  size: 'medium',
  disabled: false,
  shape: 'rounded',
  type: 'button',
  disableAnimation: false,
});

const isLink = computed(() => !!props.to);
const isButton = computed(() => !isLink.value);
const componentType = computed(() => {
  if (props.to) {
    return 'router-link';
  }
  return 'button';
});

const handleClick = (event: MouseEvent) => {
  if (props.disabled) {
    event.preventDefault();
  }
};

const buttonClass = computed(() =>
  cva('font-semibold transition-all duration-200 ease-out transform flex gap-2 items-center', {
    variants: {
      intent: {
        primary: 'bg-primary text-white shadow-sm hover:shadow-md',
        secondary: 'bg-transparent border-2 border-primary text-primary shadow-sm hover:shadow-md',
        danger: 'bg-transparent border-2 border-red-600 text-red-600 shadow-sm hover:shadow-md',
        flat: 'bg-transparent text-primary hover:bg-slate-50',
      },
      size: {
        xsmall: 'py-1 px-2 text-xs',
        small: 'py-2 px-6 text-sm',
        medium: 'py-3 px-6 text-base',
        large: 'py-4 px-8 text-lg',
      },
      disabled: {
        true: '!cursor-not-allowed !transform-none !shadow-none',
        false: 'cursor-pointer',
      },
      shape: {
        rounded: 'rounded-full',
        rectangular: 'rounded-lg',
      },
      animation: {
        true: 'transition-all duration-200 ease-out transform active:scale-98',
        false: 'transition-none transform-none',
      },
    },
    compoundVariants: [
      // Disabled states
      {
        intent: 'primary',
        disabled: true,
        class:
          '!bg-gray-300 !text-gray-500 !border-none !shadow-none hover:!bg-gray-300 hover:!text-gray-500',
      },
      {
        intent: 'secondary',
        disabled: true,
        class:
          '!text-gray-400 !border-gray-300 !shadow-none hover:!text-gray-400 hover:!border-gray-300',
      },
      {
        intent: 'danger',
        disabled: true,
        class:
          '!text-red-300 !border-red-300 !shadow-none hover:!text-red-300 hover:!border-red-300',
      },
      {
        intent: 'flat',
        disabled: true,
        class: '!text-gray-400 hover:!bg-transparent',
      },
      // Hover states (only when animation is enabled)
      {
        intent: 'primary',
        disabled: false,
        animation: true,
        class: 'hover:bg-primary-hover',
      },
      {
        intent: 'secondary',
        disabled: false,
        animation: true,
        class: 'hover:bg-primary/5',
      },
      {
        intent: 'danger',
        disabled: false,
        animation: true,
        class: 'hover:bg-red-50',
      },
      {
        intent: 'flat',
        disabled: false,
        animation: true,
        class: 'hover:no-underline transition-none hover:underline',
      },
      // No active effects when animations are disabled
      {
        animation: false,
        class: '!active:scale-100',
      },
      // No hover effects when animations are disabled
      {
        intent: 'primary',
        animation: false,
        class: '!hover:bg-primary !hover:scale-100 !hover:shadow-sm',
      },
      {
        intent: 'secondary',
        animation: false,
        class: '!hover:bg-transparent !hover:scale-100 !hover:shadow-sm',
      },
      {
        intent: 'danger',
        animation: false,
        class: '!hover:bg-transparent !hover:scale-100 !hover:shadow-sm',
      },
      {
        intent: 'flat',
        animation: false,
        class: '!hover:bg-transparent !hover:underline',
      },
      // Disabled pointer events
      {
        disabled: true,
        class: '!pointer-events-none',
      },
    ],
    defaultVariants: {
      intent: 'primary',
      size: 'medium',
      disabled: false,
      shape: 'rounded',
      animation: true,
    },
  })({
    intent: props.intent,
    size: props.size,
    disabled: props.disabled,
    shape: props.shape,
    animation: !props.disableAnimation,
  })
);
</script>

<template>
  <component :is="componentType" :to="to" :type="isButton ? type : undefined"
    :disabled="isButton ? disabled : undefined" :class="buttonClass" @click="handleClick">
    <slot name="prefixIcon" />
    <slot />
    <slot name="suffixIcon" />
  </component>
</template>

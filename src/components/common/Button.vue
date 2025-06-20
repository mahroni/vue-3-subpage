<template>
  <component :is="componentType" :to="to" :type="isButton ? type : undefined"
    :disabled="isButton ? disabled : undefined" :class="buttonClass" @click="handleClick">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { cva } from 'class-variance-authority';

interface ButtonProps {
  intent?: "primary" | "secondary" | "danger" | "flat";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  shape?: "rounded" | "rectangular";
  to?: string;
  type?: "button" | "submit" | "reset";
}

const props = withDefaults(defineProps<ButtonProps>(), {
  intent: "primary",
  size: "medium",
  disabled: false,
  shape: "rounded",
  type: "button",
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
  cva("font-bold transition duration-300 ease-in-out transform", {
    variants: {
      intent: {
        primary: "bg-primary text-white",
        secondary: "bg-transparent border border-primary text-primary",
        danger: "bg-transparent border border-red-600 text-red-600",
        flat: "bg-transparent text-primary",
      },
      size: {
        small: "py-1 px-3 text-sm",
        medium: "py-3 px-6",
        large: "py-4 px-8 text-lg",
      },
      disabled: {
        true: "!cursor-not-allowed",
        false: "",
      },
      shape: {
        rounded: "rounded-full",
        rectangular: "rounded-md",
      },
      functional: {
        true: "cursor-pointer",
        false: "",
      }
    },
    compoundVariants: [
      {
        intent: "primary",
        disabled: true,
        class: "!bg-gray-300 !text-gray-500 border-none",
      },
      {
        intent: "secondary",
        disabled: true,
        class: "!text-gray-500 !border-gray-500",
      },
      {
        intent: "danger",
        disabled: true,
        class: "!text-red-300 !border-red-300",
      },
      {
        intent: "flat",
        disabled: true,
        class: "!text-gray-500",
      },
      {
        intent: "primary",
        disabled: false,
        class: "hover:bg-primary-hover",
      },
      {
        intent: "secondary",
        disabled: false,
        class: "hover:bg-slate-100",
      },
      {
        intent: "danger",
        disabled: false,
        class: "hover:bg-red-50",
      },
      {
        intent: "flat",
        disabled: false,
        class: "hover:bg-slate-100",
      },
      {
        disabled: true,
        class: "!pointer-events-none"
      }
    ],
    defaultVariants: {
      intent: "primary",
      size: "medium",
      disabled: false,
      shape: "rounded",
    },
  })({
    intent: props.intent,
    size: props.size,
    disabled: props.disabled,
    shape: props.shape,
    functional: !props.disabled,
  })
);
</script>

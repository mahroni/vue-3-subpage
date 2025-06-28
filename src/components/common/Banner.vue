<script setup lang="ts">
import { cva } from 'class-variance-authority';

import Icon from '../icons/Icon.vue';

interface BannerProps {
  intent?: 'positive' | 'negative' | 'warning';
  type?: 'solid' | 'outline';
  closeable?: boolean;
}

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const props = withDefaults(defineProps<BannerProps>(), {
  intent: 'positive',
  type: 'solid',
  closeable: false,
});

const bannerClasses = cva('rounded-lg p-4', {
  variants: {
    intent: {
      positive: 'bg-green-200 text-text-title',
      negative: 'bg-danger text-white',
      warning: 'bg-warning-light text-text-title',
    },
    type: {
      solid: 'border-none',
      outline: 'border border-success',
    },
  },
  compoundVariants: [
    {
      intent: 'positive',
      type: 'outline',
      class: 'border-success !bg-success-light text-text-title',
    },
    {
      intent: 'warning',
      type: 'outline',
      class: 'border-warning !bg-warning-light text-text-title',
    },
    {
      intent: 'negative',
      type: 'outline',
      class: '!border-danger !bg-danger-light !text-text-title',
    },
  ],
  defaultVariants: {
    intent: 'positive',
    type: 'solid',
  },
})({
  intent: props.intent,
  type: props.type,
});

const handleClose = () => {
  emit('close');
};
</script>

<template>
  <div :class="bannerClasses">
    <div class="flex items-center justify-between">
      <slot>Banner Content</slot>

      <button v-if="props.closeable" class="text-text-title cursor-pointer" @click="handleClose">
        <Icon name="close" />
      </button>
    </div>
  </div>
</template>

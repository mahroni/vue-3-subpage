<script setup lang="ts">
import { Image } from '@/components/common/common';

interface Props {
  imageUrl?: string;
  title?: string;
  isUsingTitle?: boolean;
  isUsingIcon?: boolean;
  color?: string;
  rounded?: number;
}

const props = withDefaults(defineProps<Props>(), {
  imageUrl: '',
  title: '',
  isUsingTitle: false,
  isUsingIcon: false,
  color: '#01416C',
  rounded: 32,
});
</script>

<template>
  <div
    :style="{ backgroundColor: props.color, borderRadius: `${props.rounded}px` }"
    class="flex h-16 items-center gap-3 px-6 py-2.5"
  >
    <Image v-if="props.imageUrl" :src="props.imageUrl" :width="24" :height="24" alt="image-cta" />

    <div v-else class="bg-surface-disable h-6 w-6 animate-pulse rounded-full" />
    <span
      v-if="props.title && props.isUsingTitle"
      class="text-surface-primary-white text-base font-semibold break-words"
      >{{ props.title }}</span
    >
    <div v-else class="bg-surface-disable h-4.5 w-[80px] animate-pulse rounded-full" />
  </div>
</template>

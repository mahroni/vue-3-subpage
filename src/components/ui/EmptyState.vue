<template>
  <div class="flex flex-col items-center gap-4">
    <img :src="image_url" alt="not-found-image" />
    <div class="text-text-title text-lg font-semibold">{{ title }}</div>
    <div class="text-text-subtitle text-sm">{{ description }}</div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    image_url: string;
    title: string;
    description: string;
  }>(),
  {
    image_url: 'https://omnichannel.qiscus.com/img/empty-customer.svg',
    title: 'No Results',
    description:
      'You may want to try using different keywords or checking for the typos to find it.',
  }
);
</script>

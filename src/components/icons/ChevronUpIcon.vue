<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: number;
    class?: string;
  }>(),
  {
    size: 24,
    class: '',
  }
);
</script>

<template>
  <svg
    :width="props.size"
    :height="props.size"
    :class="props.class"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M18.7071 15.7071C19.0976 15.3166 19.0976 14.6834 18.7071 14.2929L12.7071 8.29289C12.3166 7.90237 11.6834 7.90237 11.2929 8.29289L5.29289 14.2929C4.90237 14.6834 4.90237 15.3166 5.29289 15.7071C5.68342 16.0976 6.31658 16.0976 6.70711 15.7071L12 10.4142L17.2929 15.7071C17.6834 16.0976 18.3166 16.0976 18.7071 15.7071Z"
      fill="currentColor"
    />
  </svg>
</template>

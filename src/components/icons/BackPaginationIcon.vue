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
      d="M11.289 4.29289C11.6796 3.90237 12.3127 3.90237 12.7033 4.29289C13.0938 4.68342 13.0938 5.31658 12.7033 5.70711L7.41037 11H18.9962C19.5484 11 19.9962 11.4477 19.9962 12C19.9962 12.5523 19.5484 13 18.9962 13H7.41037L12.7033 18.2929C13.0938 18.6834 13.0938 19.3166 12.7033 19.7071C12.3127 20.0977 11.6796 20.0977 11.289 19.7071C8.95387 17.372 6.5964 15.0569 4.28255 12.7006C3.90279 12.3138 3.90652 11.6748 4.28966 11.2923M4.28966 11.2923L11.289 4.29289L4.28966 11.2923Z"
      fill="currentColor"
    />
  </svg>
</template>

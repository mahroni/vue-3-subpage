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
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M13.7908 5.21936C14.0697 4.94042 14.0697 4.48816 13.7908 4.20921C13.5118 3.93026 13.0596 3.93026 12.7806 4.20921L9 7.98985L5.21936 4.20921C4.94042 3.93026 4.48816 3.93026 4.20921 4.20921C3.93026 4.48816 3.93026 4.94042 4.20921 5.21936L7.98985 9L4.20921 12.7806C3.93026 13.0596 3.93026 13.5118 4.20921 13.7908C4.48816 14.0697 4.94042 14.0697 5.21936 13.7908L9 10.0102L12.7806 13.7908C13.0596 14.0697 13.5118 14.0697 13.7908 13.7908C14.0697 13.5118 14.0697 13.0596 13.7908 12.7806L10.0102 9L13.7908 5.21936Z"
      fill="#0A0A0A"
    />
  </svg>
</template>

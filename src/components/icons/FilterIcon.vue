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
      d="M8.62556 20.753C8.58057 21.0862 8.69305 21.4417 8.95175 21.675C9.39043 22.1083 10.0991 22.1083 10.5377 21.675L15.0482 17.2201C15.307 16.9646 15.4194 16.6202 15.3744 16.298V10.6099L20.7623 3.79975C21.1447 3.32204 21.0548 2.62214 20.5711 2.24441C20.3574 2.08888 20.1212 2 19.8737 2H4.1263C3.87884 2 3.64263 2.08888 3.42892 2.24441C2.94525 2.62214 2.85526 3.32204 3.2377 3.79975L8.62556 10.6099V20.753ZM17.5791 4.22191L13.1248 9.84336V15.9758L10.8752 18.1978V9.83225L6.42092 4.22191H17.5791Z"
      fill="currentColor"
    />
  </svg>
</template>

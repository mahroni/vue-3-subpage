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
      d="M2 4.88889C2 4.39797 2.40701 4 2.90909 4H21.0909C21.593 4 22 4.39797 22 4.88889V9.33333C22 9.82425 21.593 10.2222 21.0909 10.2222H19.2727V19.1111C19.2727 19.602 18.8657 20 18.3636 20H5.63636C5.13429 20 4.72727 19.602 4.72727 19.1111V10.2222H2.90909C2.40701 10.2222 2 9.82425 2 9.33333V4.88889ZM6.54545 10.2222H17.4545V18.2222H6.54545V10.2222ZM20.1818 8.44444H18.3636H5.63636H3.81818V5.77778H20.1818V8.44444ZM9.27273 12C8.77065 12 8.36364 12.398 8.36364 12.8889C8.36364 13.3798 8.77065 13.7778 9.27273 13.7778H14.7273C15.2294 13.7778 15.6364 13.3798 15.6364 12.8889C15.6364 12.398 15.2294 12 14.7273 12H9.27273Z"
      fill="currentColor"
    />
  </svg>
</template>

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
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_12529_53080)">
      <path
        d="M9 12C10.6569 12 12 10.6569 12 9C12 7.34315 10.6569 6 9 6C7.34315 6 6 7.34315 6 9C6 10.6569 7.34315 12 9 12Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 6.00002V9.75002C12 10.3468 12.2371 10.9191 12.659 11.341C13.081 11.763 13.6533 12 14.25 12C14.8467 12 15.419 11.763 15.841 11.341C16.263 10.9191 16.5 10.3468 16.5 9.75002V9.00002C16.4999 7.30729 15.9272 5.66438 14.875 4.33842C13.8227 3.01246 12.3529 2.08144 10.7045 1.69675C9.05605 1.31205 7.32596 1.4963 5.79552 2.21955C4.26508 2.94279 3.02431 4.16249 2.27495 5.68032C1.5256 7.19814 1.31173 8.92483 1.66813 10.5796C2.02453 12.2344 2.93024 13.7199 4.23798 14.7947C5.54572 15.8695 7.17858 16.4703 8.87106 16.4994C10.5635 16.5285 12.2161 15.9842 13.56 14.955"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_12529_53080">
        <rect width="18" height="18" fill="white" />
      </clipPath>
    </defs>
  </svg>
</template>

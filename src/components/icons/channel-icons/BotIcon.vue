<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: number;
    class?: string;
    gradientStart?: string;
    gradientEnd?: string;
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
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <circle cx="12" cy="12" r="12" fill="url(#pattern0_902_5555)" />
    <defs>
      <pattern id="pattern0_902_5555" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlink:href="#image0_902_5555" transform="scale(0.0104167)" />
      </pattern>
      <image
        id="image0_902_5555"
        width="96"
        height="96"
        preserveAspectRatio="none"
        xlink:href="data:image/png;base64,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"
      />
    </defs>
  </svg>
</template>

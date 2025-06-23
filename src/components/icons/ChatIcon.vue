<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    :class="className"
    v-bind="$attrs"
  >
    <circle cx="12" cy="12" r="12" :fill="gradientId" />
    <path
      d="M9.77284 6C7.97274 6 6.5 7.46216 6.5 9.2492V14.0915C6.5 15.8785 7.97274 17.3407 9.77284 17.3407H14.6503C15.0067 17.3407 15.4371 17.3579 15.5728 17.3688C15.778 17.3662 16.8515 17.4621 17.2672 17.966C17.4667 18.2079 17.8341 17.0945 17.5775 16.6644L17.2436 16.0473C17.6635 15.5009 17.9231 14.8278 17.9231 14.0915V9.2492C17.9231 7.46216 16.4503 6 14.6503 6H9.77284ZM8.02905 13.3267V9.99605C8.02905 8.62816 9.15635 7.50907 10.5342 7.50907H13.889C15.2667 7.50907 16.3941 8.62816 16.3941 9.99605V13.1789C16.3938 13.2263 16.3921 13.305 16.386 13.4044C16.3828 13.5071 16.3709 13.6074 16.3552 13.7066C16.3474 13.7639 16.3195 14.0081 16.2322 14.1814C15.8442 14.0434 14.9105 14.3418 15.0626 14.4193C15.6324 14.7093 16.2899 16.1742 16.2899 16.1742C15.8077 15.8117 14.4493 15.8136 13.889 15.8136H10.5342C9.15635 15.8136 8.02905 14.6946 8.02905 13.3267Z"
      fill="white"
    />
    <defs>
      <linearGradient
        :id="uniqueGradientId"
        x1="24.0094"
        y1="12.016"
        x2="-1.06783e-07"
        y2="12.016"
        gradientUnits="userSpaceOnUse"
      >
        <stop :stop-color="gradientStart" />
        <stop offset="1" :stop-color="gradientEnd" />
      </linearGradient>
    </defs>
  </svg>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  size: {
    type: [String, Number],
    default: 24,
  },
  className: {
    type: String,
    default: '',
  },
  gradientStart: {
    type: String,
    default: '#74C162',
  },
  gradientEnd: {
    type: String,
    default: '#55BD97',
  },
  // Unique ID untuk gradient agar tidak konflik jika ada multiple icon
  id: {
    type: String,
    default: () => `chat-icon-${Math.random().toString(36).substr(2, 9)}`,
  },
});

// Generate unique gradient ID
const uniqueGradientId = computed(() => `paint0_linear_${props.id}`);
const gradientId = computed(() => `url(#${uniqueGradientId.value})`);

// Inherit attributes untuk fleksibilitas
// defineOptions({
//   inheritAttrs: false,
//   name: "ChatIcon",
// });
</script>

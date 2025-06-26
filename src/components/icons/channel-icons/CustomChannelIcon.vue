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
  >
    <path
      d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z"
      fill="url(#paint0_linear_902_5552)"
    />
    <path
      d="M8 17C8 18.1046 7.10457 19 6 19C4.89543 19 4 18.1046 4 17C4 15.8954 4.89543 15 6 15C7.10457 15 8 15.8954 8 17Z"
      fill="white"
    />
    <path
      d="M20 17C20 18.1046 19.1046 19 18 19C16.8954 19 16 18.1046 16 17C16 15.8954 16.8954 15 18 15C19.1046 15 20 15.8954 20 17Z"
      fill="white"
    />
    <path
      d="M14 5C14 6.10457 13.1046 7 12 7C10.8954 7 10 6.10457 10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5Z"
      fill="white"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12 11.3491L18.3201 16.6159L17.6799 17.3841L12 12.6508L6.32012 17.3841L5.67993 16.6159L12 11.3491Z"
      fill="white"
    />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 12V4H12.5V12H11.5Z" fill="white" />
    <path
      d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
      fill="url(#paint1_linear_902_5552)"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
      fill="white"
    />
    <defs>
      <linearGradient
        id="paint0_linear_902_5552"
        x1="24.0094"
        y1="12.016"
        x2="-1.06783e-07"
        y2="12.016"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#74C162" />
        <stop offset="1" stop-color="#55BD97" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_902_5552"
        x1="16.0031"
        y1="12.0053"
        x2="8"
        y2="12.0053"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#74C162" />
        <stop offset="1" stop-color="#55BD97" />
      </linearGradient>
    </defs>
  </svg>
</template>

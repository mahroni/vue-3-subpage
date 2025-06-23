<script setup lang="ts">

const props = withDefaults(defineProps<{
  size?: number
  class?: string
}>(), {
  size: 24,
  class: '',
})
</script>

<template>
  <svg :width="props.size" :height="props.size" :class="props.class" fill="none" stroke="currentColor"
    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
  </svg>
</template>
<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="props.size" :height="props.size" :class="props.class" viewBox="0 0 24 24" fill="none">
        <path 
            d="M12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5Z" 
            stroke="currentColor" 
            stroke-width="1.5" 
            stroke-linecap="round" 
            stroke-linejoin="round"
        />
        <path 
            d="M3 16C3 17.6569 4.34315 19 6 19H18C19.6569 19 21 17.6569 21 16V10C21 8.34315 19.6569 7 18 7H16.5L15 5H9L7.5 7H6C4.34315 7 3 8.34315 3 10V16Z" 
            stroke="currentColor" 
            stroke-width="1.5" 
            stroke-linecap="round" 
            stroke-linejoin="round"
        />
    </svg>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
    size?: number;
    class?: string;
}>(), {
    size: 24,
    class: ''
});
</script> 
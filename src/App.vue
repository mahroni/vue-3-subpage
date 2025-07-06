<template>
  <div id="app">
    <main class="container mx-auto">
      <router-view v-slot="{ Component }">
        <transition :enter-active-class="enterActiveClass" :enter-from-class="enterFromClass"
          :enter-to-class="enterToClass" :leave-active-class="leaveActiveClass" :leave-from-class="leaveFromClass"
          :leave-to-class="leaveToClass" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { RouterView } from 'vue-router';
import { navigationDirection } from './router'; // Import the reactive navigationDirection

// Define reactive variables for transition classes
const enterActiveClass = ref('transition-all duration-100 ease-out');
const enterFromClass = ref('opacity-0 translate-x-5');
const enterToClass = ref('opacity-100 translate-x-0');
const leaveActiveClass = ref('transition-all duration-100 ease-in');
const leaveFromClass = ref('opacity-100 translate-x-0');
const leaveToClass = ref('opacity-0 -translate-x-5');

// Watch for changes in navigationDirection and update transition classes
watchEffect(() => {
  if (navigationDirection.value === 'back') {
    // Classes for "back" navigation (slide in from left, slide out to right)
    enterFromClass.value = 'opacity-0 -translate-x-5';
    enterToClass.value = 'opacity-100 translate-x-0';
    leaveFromClass.value = 'opacity-100 translate-x-0';
    leaveToClass.value = 'opacity-0 translate-x-5';
  } else {
    // Default classes for "forward" or "initial" navigation (slide in from right, slide out to left)
    enterFromClass.value = 'opacity-0 translate-x-5';
    enterToClass.value = 'opacity-100 translate-x-0';
    leaveFromClass.value = 'opacity-100 translate-x-0';
    leaveToClass.value = 'opacity-0 -translate-x-5';
  }

  // You can also adjust active classes if needed, e.g., different durations
  // For simplicity, keeping them consistent here.
  enterActiveClass.value = 'transition-all duration-100 ease-out';
  leaveActiveClass.value = 'transition-all duration-100 ease-in';

  console.log('App.vue: Navigation direction updated to:', navigationDirection.value);
});
</script>

<style>
/* You can add global styles here if needed */
/* Ensure Tailwind CSS is properly configured in your project for these classes to work */
</style>

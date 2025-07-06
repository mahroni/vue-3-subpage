<template>
  <div id="app">
    <main class="container mx-auto">
      <router-view v-slot="{ Component }">
        <transition enter-active-class="transition-all duration-100 ease-out" enter-from-class="opacity-0 translate-x-5"
          enter-to-class="opacity-100 translate-x-0" leave-active-class="transition-all duration-100 ease-in"
          leave-from-class="opacity-100 translate-x-0" leave-to-class="opacity-0 -translate-x-5" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
// Your script setup remains the same
</script>

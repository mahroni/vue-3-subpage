<script setup lang="ts">
</script>

<template>
  <div id="app">
    <!-- <nav class="bg-gray-800 p-4">
      <div class="container mx-auto flex space-x-4">
        <router-link to="/" class="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
          active-class="bg-gray-900 text-white">
          Home
        </router-link>
        <router-link to="/about" class="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
          active-class="bg-gray-900 text-white">
          About
        </router-link>
      </div>
    </nav> -->

    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  background-color: #f9fafb;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

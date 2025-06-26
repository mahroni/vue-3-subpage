<script setup lang="ts">

</script>

<template>
  <div id="app">
    <main class="container">
      <transition enter-active-class="transition-all duration-300 ease-out" enter-from-class="opacity-0 translate-x-5"
        enter-to-class="opacity-100 translate-x-0" leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="opacity-100 translate-x-0" leave-to-class="opacity-0 -translate-x-5" mode="out-in">
        <router-view />
      </transition>
    </main>

  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  background-color: #ffffff;
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

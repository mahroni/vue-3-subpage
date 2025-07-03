<template>
  <teleport to="body">
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-xs">
      <div>
        <Animate :source="loading" />
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import loading from '@/assets/lottie/loading.json';
import Animate from '../common/Animate.vue';
</script>
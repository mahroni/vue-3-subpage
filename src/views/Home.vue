<script setup lang="ts">
import Button from '../components/common/Button.vue';

const handleClick = () => {
  console.log('Button clicked');
};
</script>

<template>
  <div class="home">
    <h1 class="text-3xl font-bold underline">Home Page</h1>
    <p class="mt-4 text-gray-600">Welcome to the home page of your Vue 3 + TypeScript + Vue Router application!</p>
    <div class="mt-4 flex gap-4 justify-center">
      <Button @click="handleClick" intent="primary" size="medium">Click me</Button>
      <Button intent="primary" size="medium" disabled>Click me</Button>
      <Button intent="secondary" size="medium">Click me</Button>
      <Button intent="secondary" size="medium" disabled>Click me</Button>
      <Button intent="danger" size="medium">Click me</Button>
      <Button intent="danger" size="medium" disabled>Click me</Button>
    </div>

    <div class="mt-4 flex gap-4 justify-center">
      <Button intent="primary" size="medium" shape="rectangular">Click me</Button>
      <Button intent="primary" size="medium" shape="rectangular" disabled>Click me</Button>
      <Button intent="secondary" size="medium" shape="rectangular">Click me</Button>
      <Button intent="secondary" size="medium" shape="rectangular" disabled>Click me</Button>
      <Button intent="danger" size="medium" shape="rectangular">Click me</Button>
      <Button intent="danger" size="medium" shape="rectangular" disabled>Click me</Button>
    </div>

    <div class="mt-4 flex gap-4 justify-center">
      <Button intent="flat" size="medium" shape="rounded" to="/about">Click me</Button>
      <Button intent="flat" size="medium" shape="rounded" to="/about" disabled>Click me</Button>
      <Button intent="flat" size="medium" shape="rounded" to="/about">Click me</Button>
      <Button intent="flat" size="medium" shape="rounded" to="/about" disabled>Click me</Button>
      <Button intent="flat" size="medium" shape="rounded" to="/about">Click me</Button>
    </div>
  </div>
</template>

<style scoped>
.home {
  padding: 2rem;
  text-align: center;
}
</style>
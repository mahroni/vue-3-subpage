<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Button from '../components/common/Button.vue';
import Switch from '../components/common/Switch.vue';
import { apiV2 } from '../utils/axios';
import Badge from '../components/common/Badge.vue';

const handleClick = () => {
  console.log('Button clicked');
};

const isChecked = ref(false);


const pokemonDetail = ref<any>({})
const pokemon = ref<any[]>([])
async function getPokemon() {
  const data = await apiV2.get<any>('/pokemon?limit=10&offset=0')
  pokemon.value = data.data?.results || []
}

async function getPokemonDetail(url: string) {
  const data = await apiV2.get<any>(url)
  pokemonDetail.value = data.data || {}
}

onMounted(() => {
  getPokemon()
})
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

    <div class="mt-4 flex gap-4 justify-center">
      <Switch v-model="isChecked" size="medium" variant="success" aria-label="Success switch" />
      <Switch v-model="isChecked" size="medium" variant="warning" aria-label="Warning switch" />
      <Switch v-model="isChecked" size="medium" variant="danger" aria-label="Danger switch" />
      <Switch v-model="isChecked" size="medium" variant="default" aria-label="Default switch" />
    </div>

    <div class="mt-4">
      <ul class="flex flex-wrap gap-4">
        <li v-for="p in pokemon" :key="p.name">
          <Badge @click="getPokemonDetail(p.url)" intent="danger" size="medium" :disabled="true">
            {{ p.name }}
          </Badge>

        </li>
      </ul>
      <div v-if="pokemonDetail && Object.keys(pokemonDetail).length > 0" class="mt-4 p-4 bg-white rounded-lg shadow-md">
        <h1 class="text-2xl font-bold capitalize mb-4">{{ pokemonDetail.name }}
        </h1>

        <img :src="pokemonDetail?.sprites?.back_default" :alt="pokemonDetail.name" class="mx-auto rounded-lg shadow-sm"
          width="150" height="150">

        <div v-if="pokemonDetail?.abilities" class="mt-6">
          <h3 class="text-xl font-semibold mb-2">Abilities</h3>
          <ul class="flex flex-wrap gap-2 justify-center">
            <li v-for="a in pokemonDetail?.abilities" :key="a?.ability?.name"
              class="px-3 py-1 bg-gray-100 rounded-full text-gray-700 capitalize">
              {{ a?.ability?.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  padding: 2rem;
  text-align: center;
}
</style>
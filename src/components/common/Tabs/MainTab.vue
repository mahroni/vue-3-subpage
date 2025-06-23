<script setup lang="ts">
const props = defineProps<{
  tabs: string[];
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const handleTabClick = (tab: string) => {
  emit('update:modelValue', tab);
};
</script>

<template>
  <ul class="flex bg-gray-300 rounded-lg p-1 w-fit select-none gap-0.5">
    <li
      v-for="tab in tabs"
      :key="tab"
      @click="handleTabClick(tab)"
      @keydown.enter="handleTabClick(tab)"
      @keydown.space="handleTabClick(tab)"
      :tabindex="0"
      role="tab"
      :aria-selected="props.modelValue === tab"
      :aria-controls="`tab-panel-${tab}`"
      class="cursor-pointer text-text-title px-6 py-2 rounded-lg transition-all duration-200 ease-out focus:outline-none focus:ring focus:ring-gray-400 hover:bg-white/50"
      :class="[
        props.modelValue === tab ? 'bg-white font-bold text-sm shadow-sm' : 'text-sm shadow-none',
      ]"
    >
      {{ tab }}
    </li>
  </ul>
</template>

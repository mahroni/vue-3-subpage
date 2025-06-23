<script setup lang="ts">
import { computed } from 'vue';

// Import icon components
import CloseIcon from './CloseIcon.vue';
import ArrowLeftIcon from './ArrowLeftIcon.vue';
import ChatIcon from './ChatIcon.vue';
import SearchIcon from './SearchIcon.vue';
import CopyIcon from './CopyIcon.vue';
import PlusIcon from './PlusIcon.vue';
import ChevronRightIcon from './ChevronRightIcon.vue';
import DoubleChevronRightIcon from './DoubleChevronRightIcon.vue';
import ChevronLeftIcon from './ChevronLeftIcon.vue';
import DoubleChevronLeftIcon from './DoubleChevronLeftIcon.vue';

interface IconProps {
  name: string;
  size?: number;
  class?: string;
}

const props = withDefaults(defineProps<IconProps>(), {
  size: 24,
  class: '',
});

// Icon registry - maps icon names to components
const iconRegistry = {
  close: CloseIcon,
  'arrow-left': ArrowLeftIcon,
  chat: ChatIcon,
  search: SearchIcon,
  copy: CopyIcon,
  plus: PlusIcon,
  'chevron-right': ChevronRightIcon,
  'double-chevron-right': DoubleChevronRightIcon,
  'chevron-left': ChevronLeftIcon,
  'double-chevron-left': DoubleChevronLeftIcon,
};

const iconComponent = computed(() => {
  const iconName = props.name.toLowerCase();
  return iconRegistry[iconName as keyof typeof iconRegistry];
});

const iconClasses = computed(() => {
  return `inline-block ${props.class}`;
});
</script>

<template>
  <component v-if="iconComponent" :is="iconComponent" :size="size" :class="iconClasses" />
  <span v-else class="text-red-500"> Icon "{{ name }}" not found </span>
</template>

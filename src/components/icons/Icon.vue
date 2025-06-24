<script setup lang="ts">
import { computed } from 'vue';

// Import icon components
import CloseIcon from './CloseIcon.vue';
import BroadcastIcon from './BroadcastIcon.vue';
import ArrowIcon from './ArrowIcon.vue';
import UserIcon from './UserIcon.vue';
import SettingIcon from './SettingIcon.vue';
import HomeIcon from './HomeIcon.vue';
import ArrowLeftIcon from './ArrowLeftIcon.vue';
import ChatIcon from './ChatIcon.vue';
import SearchIcon from './SearchIcon.vue';
import PlusIcon from './PlusIcon.vue';
import CopyIcon from './CopyIcon.vue';
import ChevronLeftIcon from './ChevronLeftIcon.vue';
import ChevronRightIcon from './ChevronRightIcon.vue';
import DoubleChevronLeftIcon from './DoubleChevronLeftIcon.vue';
import DoubleChevronRightIcon from './DoubleChevronRightIcon.vue';
import EyeIcon from './EyeIcon.vue';

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
  broadcast: BroadcastIcon,
  'arrow-down': ArrowIcon,
  user: UserIcon,
  setting: SettingIcon,
  home: HomeIcon,
  'arrow-left': ArrowLeftIcon,
  chat: ChatIcon,
  search: SearchIcon,
  plus: PlusIcon,
  copy: CopyIcon,
  'chevron-left': ChevronLeftIcon,
  'chevron-right': ChevronRightIcon,
  'double-chevron-left': DoubleChevronLeftIcon,
  'double-chevron-right': DoubleChevronRightIcon,
  eye: EyeIcon,
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

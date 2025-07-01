<template>
  <div class="overflow-hidden bg-white">
    <!-- Collapsible Header -->
    <div
      class="flex cursor-pointer items-center justify-between px-6 py-[18px] select-none"
      @click="toggleCollapse"
    >
      <!-- Slot for the title/header content -->
      <div class="text-text-title text-sm font-semibold">
        <slot name="title">{{ title }}</slot>
      </div>
      <!-- Arrow icon, rotates based on collapse state -->
      <Icon
        name="chevron-down"
        :class="{ 'rotate-180': !isCollapsed }"
        class="text-gray-600 transition-transform duration-300 ease-in-out"
      />
    </div>

    <div
      ref="contentWrapper"
      :style="{ maxHeight: contentMaxHeight }"
      class="transition-all duration-300 ease-in-out"
    >
      <!-- Slot for the collapsible content -->
      <div class="px-6 pb-[18px]">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import { Icon } from '@/components/icons';

// Define component props using defineProps
interface Props {
  title?: string; // Optional title for the header
  initiallyCollapsed?: boolean; // Optional prop to set initial collapse state
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Collapsible Section',
  initiallyCollapsed: true,
});

// Reactive state to control the collapse status
const isCollapsed = ref(props.initiallyCollapsed);

// Reference to the content wrapper element for dynamic height calculation
const contentWrapper = ref<HTMLElement | null>(null);

// Computed property for `max-height` to control the collapse animation
const contentMaxHeight = computed(() => {
  // If collapsed, max-height is 0, otherwise it's based on content height
  // We add a small buffer (e.g., 1000px) or use 'max-h-screen' for transition.
  // For precise animation, one might calculate the actual scrollHeight
  // when expanding, but 'max-h-screen' generally works well with Tailwind.
  if (isCollapsed.value) {
    return '0';
  } else {
    // A large enough value to ensure content is visible.
    // In a real application with extremely long content, you might
    // compute `contentWrapper.value?.scrollHeight + 'px'` here
    // after content is rendered, but it can be tricky with transitions.
    return '1000px'; // Using a fixed large value for simplicity and typical use cases.
  }
});

/**
 * Toggles the collapsed state of the component.
 */
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};

// Optional: If you need to do something when the component is mounted
onMounted(() => {
  // console.log('CollapsibleComponent mounted');
});
</script>

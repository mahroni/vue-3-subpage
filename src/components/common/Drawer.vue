<template>
  <teleport to="body">
    <transition name="drawer-backdrop-fade">
      <div v-if="isOpen" class="fixed inset-0 bg-[#0A0A0A99] bg-opacity-50 z-[998]" @click="closeDrawer"></div>
    </transition>

    <transition name="drawer-slide">
      <div v-if="isOpen"
        class="fixed top-0 right-0 w-[456px] max-w-full h-full bg-white shadow-xl flex flex-col z-[999] rounded-l-2xl">
        <div class="flex items-center justify-between p-4 border-b border-gray-200">
          <slot name="header">
            <h2 class="text-xl font-semibold text-[#0A0A0A]">Preview Your Qiscus Live Chat</h2>
            <CloseIcon @click="closeDrawer" class="cursor-pointer" />
          </slot>
        </div>

        <div class="flex-grow p-4 overflow-y-auto">
          <slot>
            <p class="text-gray-700">This is the default content inside the drawer.</p>
            <p class="text-gray-700 mt-2">Provide your custom content using the default slot.</p>
          </slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { watch, onMounted, onUnmounted } from 'vue';
import CloseIcon from '../icons/CloseIcon.vue';

interface DrawerProps {
  isOpen: boolean;
}
const props = defineProps<DrawerProps>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const closeDrawer = (): void => {
  emit('close');
};

const handleKeydown = (event: KeyboardEvent): void => {
  if (props.isOpen && event.key === 'Escape') {
    closeDrawer();
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
});

watch(
  () => props.isOpen,
  (newVal: boolean) => {
    if (newVal) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  },
  { immediate: true }
);
</script>


<style scoped>
/* Transition for Backdrop Fade */
.drawer-backdrop-fade-enter-active,
.drawer-backdrop-fade-leave-active {
  /* Option 1: Increase duration for a more gentle fade */
  transition: opacity 0.4s ease-in-out;
  /* Increased from 0.3s to 0.4s */

  /* Option 2 (Alternative/Combine): Use a custom cubic-bezier for a more "elastic" or pronounced fade-in/out */
  /* transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1); /* Common smooth ease-in-out */
  /* transition: opacity 0.5s cubic-bezier(0.65, 0, 0.35, 1); /* Slightly slower end for fade-out */
}

.drawer-backdrop-fade-enter-from,
.drawer-backdrop-fade-leave-to {
  opacity: 0;
}

/* Transition for Drawer Content Slide */
.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  /* Smoother ease-out and slightly longer duration */
}

.drawer-slide-enter-from,
.drawer-slide-leave-to {
  transform: translateX(100%);
}

.drawer-slide-enter-to,
.drawer-slide-leave-from {
  transform: translateX(0);
}
</style>
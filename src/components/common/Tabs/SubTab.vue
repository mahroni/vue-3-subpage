<script setup lang="ts">
import { computed } from 'vue';
import { cva } from 'class-variance-authority';
import Icon from '../../icons/Icon.vue';
import { ref } from 'vue';

interface TabItem {
  id: string;
  label: string;
  icon?: string;
  children?: TabItem[];
}

const props = defineProps<{
  tabs: TabItem[];
  modelValue: TabItem;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const TabItemClass = cva(
  'flex items-center gap-2 pt-2 pb-3 px-5 justify-center cursor-pointer select-none relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0 after:bg-primary after:rounded-t-lg after:transition-all after:duration-300',
  {
    variants: {
      isActive: {
        true: 'relative after:h-1 text-primary-500',
        false: 'text-[#0A0A0A]',
      },
    },
    defaultVariants: {
      isActive: false,
    },
  }
);

const currentTabs = computed(() => props.tabs);
const showChildren = ref<TabItem | null>(null);

function selectParentTab(tab: TabItem) {
  if (tab.children) {
    showChildren.value = tab;
  } else {
    selectTab(tab, null);
  }
}

function selectTab(tab: TabItem, child: TabItem | null) {
  let newTab: any = tab;
  if (child?.children) {
    newTab.children = child.children;
  }
  showChildren.value = null;

  emit('update:modelValue', newTab);
}
</script>

<template>
  <ul class="flex w-full gap-0.5 border-b border-gray-300 bg-transparent text-sm select-none">
    <li
      v-for="tab in currentTabs"
      :key="tab.id"
      :class="TabItemClass({ isActive: modelValue.id === tab.id })"
      @click="selectParentTab(tab)"
    >
      <Icon :name="tab.icon" v-if="tab.icon" width="16" height="16" class="text-primary-500" />
      {{ tab.label }}
      <Icon
        name="arrow-down"
        v-if="tab.children && tab.children.length > 0"
        width="16"
        height="16"
      />

      <ul
        class="absolute top-full left-0 w-auto min-w-full divide-y divide-gray-300 rounded-lg bg-white p-2 text-left shadow-lg"
        v-if="showChildren?.id === tab.id && tab.children && tab.children.length > 0"
      >
        <li
          v-for="child in tab.children"
          :key="child.id"
          class="max-w-[300px] cursor-pointer overflow-hidden p-2 text-sm text-ellipsis whitespace-nowrap hover:font-medium"
          :title="child.label"
          @click.stop="selectTab(tab, child)"
        >
          {{ child.label }}
        </li>
      </ul>
    </li>
  </ul>
</template>

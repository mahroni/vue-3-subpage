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
  'flex items-center gap-2 pt-2 pb-3 px-5 justify-center cursor-pointer select-none relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0 after:bg-primary after:rounded-t-lg after:transition-all after:duration-300 border-b border-gray-300',
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
  <ul class="flex bg-transparent rounded-lg p-1 w-fit select-none gap-0.5 text-sm">
    <li v-for="tab in currentTabs" :key="tab.id" :class="TabItemClass({ isActive: modelValue.id === tab.id })"
      @click="selectParentTab(tab)">
      <Icon :name="tab.icon" v-if="tab.icon" width="16" height="16" class="text-primary-500" />
      {{ tab.label }}
      <Icon name="arrow-down" v-if="tab.children && tab.children.length > 0" width="16" height="16" />


      <ul
        class="absolute top-full left-0  bg-white rounded-lg p-2 shadow-lg text-left divide-y divide-gray-300 w-auto min-w-full"
        v-if="showChildren?.id === tab.id && tab.children && tab.children.length > 0">
        <li v-for="child in tab.children" :key="child.id"
          class="p-2 hover:font-medium cursor-pointer text-ellipsis overflow-hidden whitespace-nowrap max-w-[300px] text-sm"
          :title="child.label" @click.stop="selectTab(tab, child)">
          {{ child.label }}
        </li>
      </ul>
    </li>
  </ul>
</template>
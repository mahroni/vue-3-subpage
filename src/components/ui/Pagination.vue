<script setup lang="ts">
import ButtonIcon from '@/components/common/ButtonIcon.vue';
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon.vue';
import ChevronRightIcon from '@/components/icons/ChevronRightIcon.vue';
import DoubleChevronLeftIcon from '@/components/icons/DoubleChevronLeftIcon.vue';
import DoubleChevronRightIcon from '@/components/icons/DoubleChevronRightIcon.vue';

interface IMetaProps {
  meta: {
    page: number;
    total_page: number;
  };
}

const props = withDefaults(defineProps<IMetaProps>(), {
  meta: () => ({
    page: 1,
    total_page: 1,
  }),
});

const emit = defineEmits<{
  (e: 'pagination', type: 'first' | 'prev' | 'next' | 'last'): void;
}>();

function pagination(type: 'first' | 'prev' | 'next' | 'last') {
  emit('pagination', type);
}
</script>

<template>
  <div class="flex items-center gap-4">
    <ButtonIcon @click="pagination('first')" class="text-primary cursor-pointer"
      :class="{ 'text-text-disable cursor-not-allowed': props.meta.page === 1 }" :disabled="props.meta.page === 1">
      <DoubleChevronLeftIcon :size="24" />
    </ButtonIcon>
    <ButtonIcon @click="pagination('prev')" class="text-primary cursor-pointer"
      :class="{ 'text-text-disable cursor-not-allowed': props.meta.page === 1 }" :disabled="props.meta.page === 1">
      <ChevronLeftIcon :size="24" />
    </ButtonIcon>
    <div
      class="flex h-10 w-12 items-center justify-center rounded-lg text-base font-bold shadow-[0px_7px_17px_0px_#33333312]">
      {{ props.meta.page }}
    </div>
    <ButtonIcon @click="pagination('next')" class="text-primary cursor-pointer" :class="{
      'text-text-disable cursor-not-allowed': props.meta.page === props.meta.total_page,
    }" :disabled="props.meta.page === props.meta.total_page">
      <ChevronRightIcon :size="24" />
    </ButtonIcon>
    <ButtonIcon @click="pagination('last')" class="text-primary cursor-pointer" :class="{
      'text-text-disable cursor-not-allowed': props.meta.page === props.meta.total_page,
    }" :disabled="props.meta.page === props.meta.total_page">
      <DoubleChevronRightIcon :size="24" />
    </ButtonIcon>
  </div>
</template>

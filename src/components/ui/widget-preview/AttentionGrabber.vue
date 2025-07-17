<script setup lang="ts">
import ButtonIcon from '@/components/common/ButtonIcon.vue';
import { CloseIcon, PlusIcon } from '@/components/icons';

withDefaults(
  defineProps<{
    imageUrl: string;
    title: string;
  }>(),
  {
    imageUrl: '',
    description: 'Hello, there is Promo!',
  }
);
</script>

<template>
  <div class="text-navy-500 flex w-[360px] flex-col overflow-hidden rounded-4xl bg-white shadow-card-float">
    <div
      class="bg-surface-disable relative grid h-[208px] max-h-[208px] min-h-[208px] w-full flex-1 place-items-center">
      <PlusIcon :size="24" v-show="!imageUrl" />
      <ButtonIcon v-show="imageUrl" class="absolute top-4 right-4 text-white">
        <CloseIcon />
      </ButtonIcon>
      <img v-show="imageUrl" :src="imageUrl" alt="" class="h-full w-full object-cover" />
    </div>
    <div class="p-6 text-left break-words">
      {{ title }}
    </div>
  </div>
</template>

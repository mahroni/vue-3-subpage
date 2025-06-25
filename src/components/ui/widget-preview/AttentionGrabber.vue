<script setup lang="ts">
import ButtonIcon from '@/components/common/ButtonIcon.vue';
import { CloseIcon, PlusIcon } from '@/components/icons';


withDefaults(defineProps<{
  imageUrl: string;
  title: string;
}>(), {
  imageUrl: '',
  description: 'Hello, there is Promo!',
});


</script>

<template>
  <div
    class="bg-white flex flex-col rounded-4xl shadow-[0px_8px_32px_0px_#0A0A0A1F] text-navy-500 w-[360px] overflow-hidden">
    <div
      class="h-[208px] max-h-[208px] min-h-[208px] w-full flex-1 relative bg-surface-disable grid place-items-center">
      <PlusIcon :size="24" v-show="!imageUrl" />
      <ButtonIcon v-show="imageUrl" class="absolute top-4 right-4 text-white">
        <CloseIcon />
      </ButtonIcon>
      <img v-show="imageUrl" :src="imageUrl" alt="" class="w-full h-full object-cover" />
    </div>
    <div class="p-6 text-left">
      {{ title }}
    </div>
  </div>
</template>
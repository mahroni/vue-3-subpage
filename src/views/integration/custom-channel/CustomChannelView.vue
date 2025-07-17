<template>
    <div class="flex flex-col gap-8 px-12 py-8">
        <router-link to="/" class="text-primary flex items-center gap-2 font-semibold">
            <BackIcon :size="20" class="text-primary" />
            Integration
        </router-link>

        <!-- Header -->
        <div class="flex items-center gap-2">
            <img :src="CHANNEL_BADGE_URL.custom" alt="Qiscus Logo" loading="lazy" width="24" height="24" />
            <h2 class="text-text-title text-xl font-semibold">Custom Channel</h2>
        </div>

        <!-- Banner documentation -->
        <CustomChannelBannerDoc />

        <!-- Table section -->
         <div class="shadow-large flex flex-1 items-center justify-between overflow-hidden rounded-2xl">
            <CustomChannelTable />
         </div>
    </div>
</template>

<script setup lang="ts">
import { BackIcon } from '@/components/icons';
import CustomChannelBannerDoc from '@/features/custom-channel/components/ui/CustomChannelBannerDoc.vue';
import CustomChannelTable from '@/features/custom-channel/pages/CustomChannelTable.vue';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';


</script>
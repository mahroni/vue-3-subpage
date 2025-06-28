<template>
  <div class="w-full h-full flex flex-col">
    <div class="flex items-center justify-between p-4">
      <!-- Search Input -->
      <InputCustom v-model="searchQuery" placeholder="Search channel name" clearable>
        <template #suffix-icon>
          <SearchIcon :size="12" />
        </template>
      </InputCustom>

      <Button to="/qiscus/create" variant="primary" class="flex items-center gap-2" size="small" no-animation>
        <PlusIcon :size="24" />
        New Integration
      </Button>
    </div>

    <!-- Table -->
    <div class="px-4 py-2 flex-1 flex flex-col justify-between overflow-auto relative">
      <table class="w-full table-fixed">
        <!-- Table Header -->
        <thead class="sticky -top-2 z-10 bg-white">
          <tr class="text-text-subtitle border-stroke-bold border-b text-[12px]">
            <th class="px-2 py-4 text-left font-normal max-w-[362px]">Channel Name</th>
            <th class="px-6 py-4 text-left font-normal">Channel ID</th>
            <th class="px-6 py-4 text-right font-normal">Action</th>
          </tr>
        </thead>

        <!-- Table Body -->
        <tbody v-if="!channelsStore.loading" class="divide-y divide-gray-100 ">
          <tr v-for="channel in props.channels" :key="channel.id" @click.prevent="getDetailChannel(channel)"
            class="hover:bg-gray-50">
            <!-- Channel Name -->
            <td class="border-stroke-regular cursor-pointer border-b px-2 py-4 max-w-[362px] ">
              <div class="flex items-center gap-2">
                <Image :src="channel.badgeUrl" alt="channel badge" :width="24" :height="24"
                  class="rounded-full aspect-square object-cover" :fallback-src="CHANNEL_BADGE_URL.qiscus" />
                <span class="text-text-title font-medium text-ellipsis overflow-hidden whitespace-nowrap">{{
                  channel.name
                  }}</span>
              </div>
            </td>

            <!-- Channel ID -->
            <td class="border-stroke-regular cursor-pointer border-b px-6 py-4">
              <div class="flex items-center gap-2">
                <span class="text-text-title font-semibold">{{ channel.channelId }}</span>
                <ButtonIcon title="Copy Channel ID" @click.stop="copyToClipboard(channel.channelId)">
                  <CopyIcon :size="12" />
                </ButtonIcon>
              </div>
            </td>

            <!-- Action (Switch) -->
            <td class="border-stroke-regular border-b px-6 py-4 text-right">
              <Switch v-model="channel.isActive" size="small" variant="success" @click.stop="() => ''"
                @update:model-value="updateChannelStatus(channel.id, $event)" />
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="channelsStore.loading" class="h-full grid place-items-center">
        <Animate :source="loading" />
      </div>

      <!-- Empty State -->
      <div v-if="props.channels.length === 0 && !channelsStore.loading" class="h-full grid place-items-center">
        <EmptyState title="No Results"
          description="You may want to try using different keywords or checking for the typos to find it."
          image_url="https://omnichannel.qiscus.com/img/empty-customer.svg" />
      </div>

      <div v-if="isShowPagination" class="flex items-center justify-between px-6 py-4">
        <div class="flex items-center gap-2">
          <span class="text-text-subtitle text-sm">
            {{ paginationInfo }}
          </span>
        </div>

        <Pagination :meta="channelsStore.meta" @pagination="pagination" />
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import { ref, type PropType, watch, computed, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQiscusStore } from '@/stores/integration-qiscus';
import {
  CopyIcon,
  SearchIcon,
  PlusIcon,
} from '@/components/icons';


import Switch from '@/components/common/Switch.vue';
import Button from '@/components/common/Button.vue';
import ButtonIcon from '@/components/common/ButtonIcon.vue';
import InputCustom from '@/components/form/InputCustom.vue';
import Animate from '@/components/common/Animate.vue';
import loading from '@/assets/lottie/loading.json';
import EmptyState from '@/components/ui/EmptyState.vue';
import Image from '@/components/common/Image.vue';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';
import Pagination from '@/components/ui/Pagination.vue';


// interface
interface IChannel {
  id: number;
  name: string;
  channelId: string;
  isActive: boolean;
  badgeUrl: string;
}

// props
const props = defineProps({
  channels: {
    type: Array as PropType<IChannel[]>,
    required: true,
  },
});

// emit
const emit = defineEmits(['updateChannelStatus', 'search', 'pagination']);

// declare
const router = useRouter();
const channelsStore = useQiscusStore();

const searchQuery = ref('') as Ref<string>;
const timeout = ref<NodeJS.Timeout | null>(null);

watch(searchQuery, (newVal) => {
  if (timeout.value) {
    clearTimeout(timeout.value);
  }
  timeout.value = setTimeout(() => {
    emit('search', newVal);
  }, 500);
});

// computed
const paginationInfo = computed(() => {
  const start = (channelsStore.meta.page - 1) * channelsStore.meta.limit + 1;
  const end = Math.min(
    channelsStore.meta.page * channelsStore.meta.limit,
    channelsStore.meta.total
  );
  return `${start}-${end} of ${channelsStore.meta.total} items`;
});

const isShowPagination = computed(() => {
  return channelsStore.meta.total_page > 1 && !channelsStore.loading;
});

// function
function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

function updateChannelStatus(id: number, isActive: boolean) {
  emit('updateChannelStatus', {
    id,
    isActive,
  });
}

// pagination function
function pagination(type: 'first' | 'prev' | 'next' | 'last') {
  if (type === 'next' && channelsStore.meta.page === channelsStore.meta.total_page) return;
  if (type === 'prev' && channelsStore.meta.page === 1) return;
  emit('pagination', type);
}

function getDetailChannel(channel: IChannel) {
  // Emit an event to parent component to handle channel detail view
  router.push({
    name: 'QiscusChannelDetail',
    params: { channelId: channel.id },
  });
}
</script>

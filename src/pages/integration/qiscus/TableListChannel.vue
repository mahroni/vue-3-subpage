<template>
  <div class="flex h-full w-full flex-col">
    <div class="flex items-center justify-between p-4">
      <!-- Search Input -->
      <InputCustom v-model="searchQuery" placeholder="Search channel name" clearable>
        <template #suffix-icon>
          <SearchIcon :size="24" />
        </template>
      </InputCustom>

      <Button
        to="/qiscus/create"
        variant="primary"
        class="flex items-center gap-2"
        size="small"
        no-animation
      >
        <PlusIcon :size="24" />
        New Integration
      </Button>
    </div>

    <!-- Table -->
    <div class="relative flex flex-1 flex-col justify-between overflow-auto px-4 py-2">
      <table class="w-full table-fixed">
        <!-- Table Header -->
        <thead class="sticky -top-2 z-10 bg-white">
          <tr class="text-text-subtitle border-stroke-bold border-b text-[12px]">
            <th class="max-w-[362px] px-2 py-4 text-left font-normal">Channel Name</th>
            <th class="px-6 py-4 text-left font-normal">Channel ID</th>
            <th class="px-6 py-4 text-right font-normal">Action</th>
          </tr>
        </thead>

        <!-- Table Body -->
        <tbody v-if="!Qiscus.loading" class="divide-y divide-gray-100">
          <tr
            v-for="channel in props.channels"
            :key="channel.id"
            @click.prevent="getDetailChannel(channel)"
            class="hover:bg-gray-50"
          >
            <!-- Channel Name -->
            <td class="border-stroke-regular max-w-[362px] cursor-pointer border-b px-2 py-4">
              <div class="flex items-center gap-2">
                <Image
                  :src="channel.badgeUrl"
                  alt="channel badge"
                  :width="24"
                  :height="24"
                  class="aspect-square rounded-full object-cover"
                  :fallback-src="CHANNEL_BADGE_URL.qiscus"
                />
                <span
                  class="text-text-title overflow-hidden font-medium text-ellipsis whitespace-nowrap"
                  >{{ channel.name }}</span
                >
              </div>
            </td>

            <!-- Channel ID -->
            <td class="border-stroke-regular cursor-pointer border-b px-6 py-4">
              <div class="flex items-center gap-2">
                <span class="text-text-title font-semibold">{{ channel.channelId }}</span>
                <ButtonIcon
                  title="Copy Channel ID"
                  @click.stop="copyToClipboard(channel.channelId)"
                >
                  <CopyIcon :size="12" />
                </ButtonIcon>
              </div>
            </td>

            <!-- Action (Switch) -->
            <td class="border-stroke-regular border-b px-6 py-4 text-right">
              <Switch
                v-model="channel.isActive"
                size="small"
                variant="success"
                @click.stop="() => ''"
                @update:model-value="updateChannelStatus(channel.id, $event)"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="Qiscus.loading" class="grid h-full place-items-center">
        <Animate :source="loading" />
      </div>

      <!-- Empty State -->
      <div
        v-if="props.channels.length === 0 && !Qiscus.loading"
        class="grid h-full place-items-center"
      >
        <EmptyState
          title="No Results"
          description="You may want to try using different keywords or checking for the typos to find it."
          image_url="https://omnichannel.qiscus.com/img/empty-customer.svg"
        />
      </div>

      <div v-if="isShowPagination" class="flex items-center justify-between px-6 py-4">
        <div class="flex items-center gap-2">
          <span class="text-text-subtitle text-sm">
            {{ paginationInfo }}
          </span>
        </div>

        <Pagination :meta="Qiscus.meta" @pagination="pagination" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type PropType, type Ref, computed, defineAsyncComponent, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import loading from '@/assets/lottie/loading.json';
import { Button, ButtonIcon, Image } from '@/components/common/common';
import InputCustom from '@/components/form/InputCustom.vue';
import { CopyIcon, PlusIcon, SearchIcon } from '@/components/icons';
import EmptyState from '@/components/ui/EmptyState.vue';
import Pagination from '@/components/ui/Pagination.vue';
import { useFetchQiscus } from '@/composables/channels/qiscus/useFetchQiscus';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';

// async component
const Animate = defineAsyncComponent(() => import('@/components/common/Animate.vue'));

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
const Qiscus = useFetchQiscus();

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
  const start = (Qiscus.meta.value.page - 1) * Qiscus.meta.value.limit + 1;
  const end = Math.min(Qiscus.meta.value.page * Qiscus.meta.value.limit, Qiscus.meta.value.total);
  return `${start}-${end} of ${Qiscus.meta.value.total} items`;
});

const isShowPagination = computed(() => {
  return Qiscus.meta.total_page > 1 && !Qiscus.loading;
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
  if (type === 'next' && Qiscus.meta.value.page === Qiscus.meta.value.total_page) return;
  if (type === 'prev' && Qiscus.meta.value.page === 1) return;
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

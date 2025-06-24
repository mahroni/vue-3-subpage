<template>
  <div class="w-full">
    <div class="flex items-center justify-between">
      <!-- Search Input -->
      <div class="relative mb-6">
        <InputCustom v-model="searchQuery" placeholder="Search channel name" clearable>
          <template #suffix-icon>
            <Icon name="search" />
          </template>
        </InputCustom>
      </div>

      <div>
        <Button
          to="/qiscus/create"
          variant="primary"
          class="flex items-center gap-2"
          size="small"
          no-animation
        >
          <Icon name="plus" :size="16" />
          New Integration
        </Button>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-hidden">
      <table class="w-full">
        <!-- Table Header -->
        <thead>
          <tr class="text-text-subtitle border-stroke-bold border-b text-[12px]">
            <th class="px-2 py-4 text-left font-normal">Channel Name</th>
            <th class="px-6 py-4 text-left font-normal">Channel ID</th>
            <th class="px-6 py-4 text-right font-normal">Action</th>
          </tr>
        </thead>

        <!-- Table Body -->
        <tbody class="divide-y divide-gray-100">
          <tr v-for="channel in props.channels" :key="channel.id" class="hover:bg-gray-50">
            <!-- Channel Name -->
            <td
              @click.prevent="getDetailChannel(channel)"
              class="border-stroke-regular cursor-pointer border-b px-2 py-4"
            >
              <div class="flex items-center gap-2">
                <img :src="channel.badgeUrl" alt="channel badge" class="h-6 w-6" />
                <span class="text-text-title font-medium">{{ channel.name }}</span>
              </div>
            </td>

            <!-- Channel ID -->
            <td
              @click.prevent="getDetailChannel(channel)"
              class="border-stroke-regular cursor-pointer border-b px-6 py-4"
            >
              <div class="flex items-center gap-2">
                <span class="text-text-title font-semibold">{{ channel.channelId }}</span>
                <button
                  class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-gray-300 active:bg-gray-400"
                  title="Copy Channel ID"
                  @click="copyToClipboard(channel.channelId)"
                >
                  <Icon name="copy" :size="12" class="text-primary" />
                </button>
              </div>
            </td>

            <!-- Action (Switch) -->
            <td class="border-stroke-regular border-b px-6 py-4 text-right">
              <Switch
                v-model="channel.isActive"
                size="small"
                variant="success"
                @update:model-value="updateChannelStatus(channel.id, $event)"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div class="flex items-center justify-between pt-4">
        <div class="flex items-center gap-2">
          <span class="text-text-subtitle text-sm">1-10 of 180 items</span>
        </div>

        <div class="flex items-center gap-4">
          <Icon name="double-chevron-left" :size="12" />
          <Icon name="chevron-left" :size="12" />
          <div
            class="shadow-small flex h-10 w-12 items-center justify-center rounded-lg text-base font-bold"
          >
            1
          </div>
          <Icon name="chevron-right" :size="12" />
          <Icon name="double-chevron-right" :size="12" />
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!props.channels" class="px-6 py-12 text-center">
        <p class="text-gray-500">No channels found</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type PropType, watch } from 'vue';
import { type Ref } from 'vue';
import { useRouter } from 'vue-router';
import Icon from '@/components/icons/Icon.vue';
import Switch from '@/components/common/Switch.vue';
import Button from '@/components/common/Button.vue';
import InputCustom from '../../../components/form/InputCustom.vue';

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

const router = useRouter();

// emit
const emit = defineEmits(['updateChannelStatus', 'search']);
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

function getDetailChannel(channel: IChannel) {
  // Emit an event to parent component to handle channel detail view
  router.push({
    name: 'QiscusChannelDetail',
    params: { channelId: channel.id },
  });
}
</script>

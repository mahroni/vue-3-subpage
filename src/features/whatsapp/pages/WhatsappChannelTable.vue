<template>
    <div class="flex h-full w-full flex-col">
        <div class="flex items-center justify-between p-4">
            <InputCustom v-model="searchQuery" placeholder="Search channel name" class="min-w-[340px]" clearable>
                <template #suffix-icon>
                    <SearchIcon :size="24" />
                </template>
            </InputCustom>
            <Button @click="handleNewIntegration" variant="primary" class="flex items-center gap-2" size="small" no-animation>
                New Integration
            </Button>
        </div>

        <div class="relative flex flex-1 flex-col justify-between overflow-auto px-4 py-2">
            <table class="w-full table-fixed">
                <thead class="sticky -top-2 z-10 bg-white">
                    <tr class="text-text-subtitle border-stroke-bold border-b text-[12px]">
                        <th class="max-w-[362px] px-2 py-4 text-left font-normal">Channel Name</th>
                        <th class="px-6 py-4 text-left font-normal">Tag Channel</th>
                        <th class="px-6 py-4 text-right font-normal">Action</th>
                    </tr>
                </thead>
                <tbody v-if="!loadingList" class="divide-y divide-gray-100">
                    <tr v-for="channel in channels" :key="channel.id" class="hover:bg-gray-50" @click.prevent="getDetailChannel(channel)">
                        <td class="border-stroke-regular max-w-[362px] cursor-pointer border-b px-2 py-4">
                            <div class="flex items-center gap-2">
                                <Image :src="channel.badgeUrl" :fallbackSrc="CHANNEL_BADGE_URL.whatsapp" alt="channel badge" :width="24" :height="24" class="aspect-square rounded-full object-cover max-w-6 max-h-6" />
                                <span class="text-text-title overflow-hidden font-medium text-ellipsis whitespace-nowrap">{{ channel.name }}</span>
                            </div>
                        </td>
                        <td class="border-stroke-regular cursor-pointer border-b px-6 py-4">
                            <ChannelTags :data="{ isMmlite: channel.isMmlite && cMMLiteFeature() == 1, isCoex: channel.isCoex }" />
                        </td>
                        <td class="border-stroke-regular border-b px-6 py-4 text-right">
                            <Switch
                                v-model="channel.isActive"
                                size="small"
                                variant="success"
                                @click.stop
                                @update:model-value="updateChannelStatus(channel.id, $event)"/>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div v-if="loadingList" class="grid h-full place-items-center">
                <Animate :source="loadingAnimationData" />
            </div>
            
            <div v-if="channels.length === 0 && !loadingList" class="absolute inset-0 flex items-center justify-center">
                <EmptyState title="No Results" description="You may want to try using different keywords or checking for the typos to find it." image_url="https://omnichannel.qiscus.com/img/empty-customer.svg"/>
            </div>

            <div v-if="isShowPagination" class="flex items-center justify-between px-6 py-4">
                <div class="flex items-center gap-2">
                  <span class="text-text-subtitle text-sm">
                    {{ paginationInfo }}
                  </span>
                </div>
        
                <Pagination :meta="meta" @pagination="pagination" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import loadingAnimationData from '@/assets/lottie/loading.json';
import { Animate, Button, Image, Switch } from '@/components/common/common';
import InputCustom from '@/components/form/InputCustom.vue';
import { SearchIcon } from '@/components/icons';
import EmptyState from '@/components/ui/EmptyState.vue';
import Pagination from '@/components/ui/Pagination.vue';
import { useFetchWhatsappChannel } from '@/composables/channels/whatsapp/useFetchWhatsappChannel';
import { useUpdateWhatsappChannel } from '@/composables/channels/whatsapp/useUpdateWhatsappChannel';
import { useSweetAlert } from '@/composables/useSweetAlert';
import { useAppFeaturesStore } from '@/stores/app-features';
import { usePlanStore } from '@/stores/plan';
import type { WhatsappChannel } from '@/types/schemas/wa-channel-list';
import { CHANNEL_BADGE_URL } from '@/utils/constant/channels';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref, toValue, watch, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import ChannelTags from '../components/ui/ChannelTags.vue';

interface FetchParams {
  search?: string;
  page?: number;
};

const searchQuery = ref('') as Ref<string>;
const params = ref<FetchParams>({});


const { fetchChannels, data: listData, loading: loadingList, meta } = useFetchWhatsappChannel();
const { showAlert } = useSweetAlert();
const router = useRouter();
const { featureData } = storeToRefs(useAppFeaturesStore());
const { planData } = storeToRefs(usePlanStore());


// function
function updateExistingListData(newData: WhatsappChannel) {
  const fIdx = listData.value.findIndex((ld) => ld.id === newData.id);

  if (fIdx === -1) return;
  if (!listData.value[fIdx]) return;

  listData.value[fIdx].is_active = newData.is_active;

  const status = newData.is_active ? 'Activated' : 'Deactivated';
  showAlert.success({
    title: 'Success',
    text: `${status} channel successfully`,
    confirmButtonText: 'Okay',
    showCancelButton: false,
  });
};

const debounce = (func: Function, delay: number) => {
  let timeout: NodeJS.Timeout;
  return function (this: any, ...args: any[]) {
    // oxlint-disable-next-line no-this-alias
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
};

const cMMLiteFeature = () => {
    const integration = featureData.value.find(ft => ft.name.toLowerCase() == 'integration')
    if (!integration) return false

    const waMMLite = integration.features?.find(ft => ft.name.toLowerCase() == 'whatsapp_mmlite')
    
    if (!waMMLite) return false
    
    return waMMLite.status
};

const handleSearch = debounce((newVal: string) => {
  params.value = { search: newVal };
  fetchChannels(toValue(params));
}, 500);

const getDetailChannel = (channel: { id: number }) => {
    router.push({
        name: 'whatsapp-detail',
        params: {
            id: channel.id.toString(),
        },
    });
};

const handleNewIntegration = () => {
  if(planData.value && channels.value.length < planData.value.max_wa_channel) {
    router.push({
        name: 'whatsapp-new',
    })
  } else {
    showAlert.warning({
      title: 'Important Notice',
      text: 
      `<div>
          <span style="color: #565656; font-family: Inter; font-weight: 400;">
          You will be charged an additional fee if you want to add a new Whatsapp integration.
          </span>
          <div
          style="background: #FFF2D1;color: #0A0A0A;font-size: 14px;padding: 10px 8px;border-radius: 6px; margin-top: 30px;">
              <div class="flex items-center" style="padding: 0 15px;">
                  <svg width="24" height="24" viewBox="0 0 24 24" style="margin-right: 15px; width: 100px; height: 100px;" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.29 3.86L1.82002 18C1.64539 18.3024 1.55299 18.6453 1.55201 18.9945C1.55103 19.3437 1.64151 19.6871 1.81445 19.9905C1.98738 20.2939 2.23675 20.5467 2.53773 20.7239C2.83871 20.901 3.18082 20.9962 3.53002 21H20.47C20.8192 20.9962 21.1613 20.901 21.4623 20.7239C21.7633 20.5467 22.0127 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.4471 18.6453 22.3547 18.3024 22.18 18L13.71 3.86C13.5318 3.56611 13.2807 3.32312 12.9812 3.15448C12.6817 2.98585 12.3438 2.89725 12 2.89725C11.6563 2.89725 11.3184 2.98585 11.0188 3.15448C10.7193 3.32312 10.4683 3.56611 10.29 3.86V3.86Z" stroke="#EB5757" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M12 9V13" stroke="#EB5757" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M12 17H12.01" stroke="#EB5757" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      <span style="font-weight: 400;font-size: 12px;line-height: 19.6px;letter-spacing: -0.006em; text-align: left; margin-left: 10px;">
                      For each addition of WABA number or WABA ID will incur a fee of minimum IDR 250,000 or USD 17 per month. Please contact your account manager or 
                      <a class="panel-info__link" style="color: #27B199" href="https://www.qiscus.com/contact" target="_blank">Contact Us</a> for the exact fee.
                      </span>
                </div>
            </div>
        </div>`,
      confirmButtonText: 'Cancel',
      showCancelButton: false,
    })
  }
};

async function pagination(type: 'first' | 'prev' | 'next' | 'last') {
  const currentMeta = meta.value;
  let page = currentMeta.page; // Start with current page

  switch (type) {
    case 'first':
      page = 1;
      break;
    case 'prev':
      page = Math.max(1, page - 1); // Ensure page doesn't go below 1
      break;
    case 'next':
      page = Math.min(currentMeta.total_page, page + 1); // Ensure page doesn't exceed total_page
      break;
    case 'last':
      page = currentMeta.total_page;
      break;
    default:
      break;
  }
  params.value = {
    ...params.value,
    page,
  };

  await fetchChannels(toValue(params));
};

async function updateChannelStatus(id: number, is_active: boolean) {
  const { update, data, error } = useUpdateWhatsappChannel();

  try {
    await update(id, { is_active });

    if (error.value) {
      // Revert the switch state on the client if API call fails
      const channelToRevert = channels.value.find((c) => c.id === id);
      if (channelToRevert) {
        channelToRevert.isActive = !is_active; // Revert to previous state
      }
      showAlert.error({
        title: 'Error',
        text: `Failed to update channel status. Please try again.`,
        confirmButtonText: 'Okay',
        showCancelButton: false,
      });
      return;
    }

    // Update the local listData with the new state from the API response
    const newData = toValue(data) as unknown as WhatsappChannel;
    if (newData) updateExistingListData(newData);
  } catch (err: any) {
    // Handle unexpected errors during the update process (e.g., network issues)
    const channelToRevert = channels.value.find((c) => c.id === id);
    if (channelToRevert) {
      channelToRevert.isActive = !is_active; // Revert to previous state
    }
    showAlert.error({
      title: 'Error',
      text: `An unexpected error occurred: ${err.message || 'Please try again.'}`,
      confirmButtonText: 'Okay',
      showCancelButton: false,
    });
  }
}


// side-effect
const channels = computed(() =>
    listData.value.map((channel) => ({
        allocateWaCallWebhookUrl: channel.allocate_wa_call_webhook_url,
        badgeUrl: channel.badge_url ? channel.badge_url : CHANNEL_BADGE_URL.whatsapp,
        baseUrl: channel.base_url,
        businessId: channel.business_id,
        businessVerificationStatus: channel.business_verification_status,
        currency: channel.currency,
        eligibleWaCall: channel.eligible_wa_call,
        encodedToken: channel.encoded_token,
        forwardEnabled: channel.forward_enabled,
        forwardUrl: channel.forward_url,
        id: channel.id,
        isActive: channel.is_active,
        isAllocateWaCallWebhookEnabled: channel.is_allocate_wa_call_webhook_enabled,
        isAuthInternational: channel.is_auth_international,
        isAutoResponderEnabled: channel.is_auto_responder_enabled,
        isBotEnabled: channel.is_bot_enabled,
        isCoex: channel.is_coex,
        isMmlite: channel.is_mmlite,
        isOnCloud: channel.is_on_cloud,
        isPostpaid: channel.is_postpaid,
        isSslEnabled: channel.is_ssl_enabled,
        isTemplateOptimized: channel.is_template_optimized,
        name: channel.name,
        phoneNumber: channel.phone_number,
        phoneNumberId: channel.phone_number_id,
        phoneNumberStatus: channel.phone_number_status,
        platform: channel.platform,
        pricingModel: channel.pricing_model,
        primaryBusinessLocation: channel.primary_business_location,
        readEnabled: channel.read_enabled,
    }))
);

const isShowPagination = computed(() => {
  // Check if meta.value exists and has relevant properties, and channels array is not empty
  return meta.value && typeof meta.value.total === 'number' && channels.value.length > 0;
});

const paginationInfo = computed(() => {
  const newMeta = meta.value;
  if (!newMeta || newMeta.total === undefined) return '0-0 of 0 items'; // Handle case where meta is not yet loaded

  const start = (newMeta.page - 1) * newMeta.limit + 1;
  const end = Math.min(newMeta.page * newMeta.limit, newMeta.total);
  return `${start}-${end} of ${newMeta.total} items`;
});  

onMounted(async () => {
    await fetchChannels();
});

watch(searchQuery, handleSearch);
</script>
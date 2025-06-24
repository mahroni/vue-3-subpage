import { defineStore } from 'pinia';
import { ref } from 'vue';
import { whatsappChannelApi } from '../api/channels';
import type { IWhatsappChannel } from '../types/channels';

export const useChannelsStore = defineStore('channels', () => {
  // State
  const channels = ref<any>({});
  const wa_channels = ref<IWhatsappChannel[]>([]);

  // getter
  const getWhatsappChannels = async () => {
    // return channels.value.wa_channels;
    
    wa_channels.value = [
      {
          "allocate_wa_call_webhook_url": null,
          "badge_url": "https://latest-omnichannel.qiscus.com/img/whatsapp_badge.svg",
          "base_url": "https://whatsapp-api-client215-cvbn76.qiscus.com",
          "business_id": null,
          "business_verification_status": null,
          "currency": null,
          "eligible_wa_call": false,
          "encoded_token": "************************",
          "forward_enabled": false,
          "forward_url": null,
          "id": 4650,
          "is_active": true,
          "is_allocate_wa_call_webhook_enabled": false,
          "is_auth_international": false,
          "is_auto_responder_enabled": false,
          "is_bot_enabled": true,
          "is_coex": false,
          "is_mmlite": false,
          "is_on_cloud": false,
          "is_postpaid": null,
          "is_ssl_enabled": false,
          "is_template_optimized": false,
          "name": "Qiscus Product OnPrem 1zxxx",
          "phone_number": "+6288215064333",
          "phone_number_id": null,
          "phone_number_status": null,
          "platform": "default",
          "pricing_model": "cbp",
          "primary_business_location": null,
          "read_enabled": false
        }
    ];
  };

  // methods
  const getChannels = async () => {
    const { data } = await whatsappChannelApi.getChannels();
    const data2 = data as any;
    channels.value = data2.data;
  };

  const updateChannelStatus = async (id: number, isActive: boolean) => {
    // const { data } = await whatsappChannelApi.updateChannelStatus(id, isActive);

    const findIndex = wa_channels.value.findIndex((channel) => channel.id === id);
    if (findIndex !== -1 && wa_channels.value[findIndex]) {
      wa_channels.value[findIndex].is_active = isActive;
    }
  };



  return {
    channels,
    wa_channels,
    getChannels,
    getWhatsappChannels,
    updateChannelStatus,
  };
});

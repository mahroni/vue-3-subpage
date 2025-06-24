import { apiV2 } from './../utils/axios';

// API v1 examples
export const whatsappChannelApi = {
  // Get all channels
  getChannels: () => apiV2.get<any[]>('/channels'),
  updateChannelStatus: (id: number, isActive: boolean) => apiV2.post(`/qiscus/connect/${id}/update`, { is_active: isActive }),
};
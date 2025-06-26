import { apiV2, apiV3 } from './../utils/axios';

// API v1 examples
export const channelsApi = {
  // Get all channels
  getChannels: () => apiV2.get<any[]>('/channels'),
  updateChannelStatus: (id: number, isActive: boolean) =>
    apiV2.post(`/qiscus/connect/${id}/update`, { is_active: isActive }),
};

interface IParams {
  limit?: number;
  page?: number;
  search?: string;
}

export const qiscusApi = {
  get: (params: IParams) => apiV3.get<any[]>('/admin/channel/qiscus', { params }),
  getById: (id: number) => apiV3.get<any>(`/admin/channel/qiscus/${id}`),
};

export const whatsappApi = {
  get: (params: IParams) => apiV3.get<any[]>('/admin/channel/wa', { params }),
  getById: (id: number) => apiV3.get<any>(`/admin/channel/wa/${id}`),
};

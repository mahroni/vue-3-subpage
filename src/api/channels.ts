import type { IParams } from '@/types/api';

import { apiV2, apiV3 } from './../utils/axios';

// API v1 examples
export const channelsApi = {
  getChannels: () => apiV2.get<any[]>('/channels'),
  updateChannelStatus: (id: number, isActive: boolean) =>
    apiV2.post(`/qiscus/connect/${id}/update`, { is_active: isActive }),
};

export const qiscusApi = {
  get: (params: IParams) => apiV3.get<any[]>('/admin/channel/qiscus', { params }),
  getById: (id: number) => apiV2.get<any>(`/qiscus/${id}`),
  update: (data: any) => apiV2.post<any>(`qiscus/connect/${data.id}/update`, data),
};

export const whatsappApi = {
  get: (params: IParams) => apiV3.get<any[]>('/admin/channel/wa', { params }),
  getById: (id: number) => apiV2.get<any>(`/wa/${id}`),
};

import { apiV2 } from './../utils/axios';

// API v1 examples
export const channelApi = {
  // Get all users
  getUsers: () => apiV2.get<any[]>('/channels'),
};
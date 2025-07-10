// Widget Builder Channel Types
export interface IWidgetChannel {
  id: number;
  icon: string;
  name: string;
  enabled: boolean;
  link: string;
}

// Utility types - lebih flexible dan reusable
export type WidgetChannelFormData = Omit<IWidgetChannel, 'id' | 'enabled'>;
export type WidgetChannelUpdateData = Partial<Omit<IWidgetChannel, 'id'>>;
export type WidgetChannelCreateData = Omit<IWidgetChannel, 'id'>;

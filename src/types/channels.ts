export interface IWhatsappChannel {
  allocate_wa_call_webhook_url: string | null;
  badge_url: string;
  base_url: string;
  business_id: string | null;
  business_verification_status: string | null;
  currency: string | null;
  eligible_wa_call: boolean;
  encoded_token: string;
  forward_enabled: boolean;
  forward_url: string | null;
  id: number;
  is_active: boolean;
  is_allocate_wa_call_webhook_enabled: boolean;
  is_auth_international: boolean;
  is_auto_responder_enabled: boolean;
  is_bot_enabled: boolean;
  is_coex: boolean;
  is_mmlite: boolean;
  is_on_cloud: boolean;
  is_postpaid: boolean | null;
  is_ssl_enabled: boolean;
  is_template_optimized: boolean;
  name: string;
  phone_number: string;
  phone_number_id: string | null;
  phone_number_status: string | null;
  platform: string;
  pricing_model: string;
  primary_business_location: string | null;
  read_enabled: boolean;
}

export interface IQiscusChannel {
  id: number;
  is_active: boolean;
  app_code: string;
  name: string;
  badge_url: string | null;
  app_id: number;
  use_channel_responder: boolean;
  is_secure: boolean;
  is_secure_toc: boolean;
  created_at: Date;
  updated_at: Date;
  secret_key: string;
  forward_url: null;
  forward_enabled: boolean;
}

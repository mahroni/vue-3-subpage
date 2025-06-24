<script setup lang="ts">
import { computed } from 'vue';

// Import icon components
import InboxIcon from './InboxIcon.vue';
import BroadcastIcon from './BroadcastIcon.vue';
import CustomerIcon from './CustomerIcon.vue';
import AnalyticsIcon from './AnalyticsIcon.vue';
import IntegrationIcon from './IntegrationIcon.vue';
import AppCenterIcon from './AppCenterIcon.vue';
import RobolabsIcon from './RobolabsIcon.vue';
import QTicketingIcon from './QTicketingIcon.vue';
import QCRMIcon from './QCRMIcon.vue';
import WorkFlowIcon from './WorkFlowIcon.vue';
import MobileIcon from './MobileIcon.vue';
import SettingIcon from './SettingIcon.vue';
import HelpIcon from './HelpIcon.vue';
import LogoutIcon from './LogoutIcon.vue';
import FilterOnIcon from './FilterOnIcon.vue';
import ChatTemplateIcon from './ChatTemplateIcon.vue';
import NotesIcon from './NotesIcon.vue';
import CreditCardIcon from './CreditCardIcon.vue';
import UserIcon from './UserIcon.vue';
import PredifinedMessageIcon from './PredifinedMessageIcon.vue';
import HoursIcon from './HoursIcon.vue';
import TagsIcon from './TagsIcon.vue';
import BulkResolvedIcon from './BulkResolvedIcon.vue';
import SendIcon from './SendIcon.vue';
import CustomerPropertiesIcon from './CustomerPropertiesIcon.vue';
import NotificationIcon from './NotificationIcon.vue';
import SearchIcon from './SearchIcon.vue';
import SubscriptionIcon from './SubscriptionIcon.vue';
import MergeIcon from './MergeIcon.vue';
import EyeIcon from './EyeIcon.vue';
import CustomAgentAllocationIcon from './CustomAgentAllocationIcon.vue';
import TemplateMessageIcon from './TemplateMessageIcon.vue';
import SubmitTicketIcon from './SubmitTicketIcon.vue';
import WhatsappBusinessIcon from './WhatsappBusinessIcon.vue';
import GeneralIcon from './GeneralIcon.vue';
import AgentManagementIcon from './AgentManagementIcon.vue';
import APIIcon from './APIIcon.vue';
import CopyIcon from './CopyIcon.vue';
import InformationIcon from './InformationIcon.vue';
import MoreIcon from './MoreIcon.vue';
import PlusIcon from './PlusIcon.vue';
import FilterIcon from './FilterIcon.vue';
import EditIcon from './EditIcon.vue';
import RefreshIcon from './RefreshIcon.vue';
import PuzzleIcon from './PuzzleIcon.vue';
import SuccessIcon from './SuccessIcon.vue';
import ErrorIcon from './ErrorIcon.vue';
import AttentionIcon from './AttentionIcon.vue';
import WarningIcon from './WarningIcon.vue';
import ChevronRightIcon from './ChevronRightIcon.vue';
import ChevronLeftIcon from './ChevronLeftIcon.vue';
import ChevronUpIcon from './ChevronUpIcon.vue';
import ChevronDownIcon from './ChevronDownIcon.vue';
import NextPaginationIcon from './NextPaginationIcon.vue';
import BackPaginationIcon from './BackPaginationIcon.vue';
import CloseIcon from './CloseIcon.vue';
import BackIcon from './BackIcon.vue';
import NextIcon from './NextIcon.vue';
import ShopIcon from './ShopIcon.vue';

// Common icons
import HomeIcon from './HomeIcon.vue';
import ChatIcon from './channel-icons/WidgetIcon.vue';
import DoubleChevronLeftIcon from './DoubleChevronLeftIcon.vue';
import DoubleChevronRightIcon from './DoubleChevronRightIcon.vue';

interface IconProps {
  name: string;
  size?: number;
  class?: string;
}

const props = withDefaults(defineProps<IconProps>(), {
  size: 24,
  class: '',
});

// Icon registry - maps icon names to components
const iconRegistry = {
  inbox: InboxIcon,
  broadcast: BroadcastIcon,
  customer: CustomerIcon,
  analytics: AnalyticsIcon,
  integration: IntegrationIcon,
  'app-center': AppCenterIcon,
  robolabs: RobolabsIcon,
  ticketing: QTicketingIcon,
  qcrm: QCRMIcon,
  workflow: WorkFlowIcon,
  mobile: MobileIcon,
  setting: SettingIcon,
  help: HelpIcon,
  logout: LogoutIcon,
  'filter-on': FilterOnIcon,
  'chat-template': ChatTemplateIcon,
  notes: NotesIcon,
  'credit-card': CreditCardIcon,
  user: UserIcon,
  'predifined-message': PredifinedMessageIcon,
  hours: HoursIcon,
  tags: TagsIcon,
  'bulk-resolved': BulkResolvedIcon,
  send: SendIcon,
  'customer-properties': CustomerPropertiesIcon,
  notification: NotificationIcon,
  search: SearchIcon,
  subscription: SubscriptionIcon,
  merge: MergeIcon,
  eye: EyeIcon,
  'custom-agent-allocation': CustomAgentAllocationIcon,
  'template-message': TemplateMessageIcon,
  'submit-ticket': SubmitTicketIcon,
  'whatsapp-business': WhatsappBusinessIcon,
  general: GeneralIcon,
  'agent-management': AgentManagementIcon,
  api: APIIcon,
  copy: CopyIcon,
  information: InformationIcon,
  more: MoreIcon,
  plus: PlusIcon,
  filter: FilterIcon,
  edit: EditIcon,
  refresh: RefreshIcon,
  puzzle: PuzzleIcon,
  success: SuccessIcon,
  error: ErrorIcon,
  attention: AttentionIcon,
  warning: WarningIcon,
  'chevron-right': ChevronRightIcon,
  'chevron-left': ChevronLeftIcon,
  'chevron-up': ChevronUpIcon,
  'chevron-down': ChevronDownIcon,
  'next-pagination': NextPaginationIcon,
  'back-pagination': BackPaginationIcon,
  close: CloseIcon,
  back: BackIcon,
  next: NextIcon,
  shop: ShopIcon,
  // Common icons
  home: HomeIcon,
  chat: ChatIcon,
  'double-chevron-left': DoubleChevronLeftIcon,
  'double-chevron-right': DoubleChevronRightIcon,
};

const iconComponent = computed(() => {
  const iconName = props.name.toLowerCase();
  return iconRegistry[iconName as keyof typeof iconRegistry];
});

const iconClasses = computed(() => {
  return `inline-block ${props.class}`;
});
</script>

<template>
  <component v-if="iconComponent" :is="iconComponent" :size="size" :class="iconClasses" />
  <span v-else class="text-red-500"> Icon "{{ name }}" not found </span>
</template>

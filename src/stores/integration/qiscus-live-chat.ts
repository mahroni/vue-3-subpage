import { defineStore } from 'pinia';
import { ref, watch } from 'vue';



import type { IconName } from '@/components/icons/Icon.vue';
import type {
  IWidgetChannel,
  WidgetChannelCreateData,
  WidgetChannelUpdateData,
} from '@/pages/integration/widget/widget-builder/channels/channels';
import type { IActionWelcomeDialog, IAdditionalField } from '@/types/live-chat';

export const useQiscusLiveChatStore = defineStore('create-qiscus-live-chat', () => {
  // STATE
  const isChannelsEnabled = ref<boolean>(false);
  const isQiscusLiveChat = ref<boolean>(false);
  const previewTitle = ref<string>('Ask for Question');
  const previewSubtitle = ref<string>('In Everythings!');
  const previewIntroduction = ref<string>('More personalized chat with us on:');
  const previewLiveChatName = ref<string>('Live Chat');
  const channelName = ref<string>('');
  const channelLink = ref<string>('');
  const channelBadgeIcon = ref<string>('');

  const channelList = ref<IWidgetChannel[]>([
    { id: 1, icon: 'whatsapp', name: 'Whatsapp', enabled: true, link: '' },
    { id: 2, icon: 'facebook', name: 'Facebook', enabled: false, link: '' },
    { id: 3, icon: 'line', name: 'Line', enabled: false, link: '' },
    { id: 4, icon: 'telegram', name: 'Telegram', enabled: false, link: '' },
    { id: 6, icon: 'tiktok', name: 'Tiktok', enabled: true, link: '' },
  ]);
  // state for welcome dialog
  const isWelcomeDialog = ref<boolean>(true);
  const isAttentionGrabber = ref<boolean>(false);
  const firstDescriptionWelcomeDialog = ref<string>('Hello There,');
  const secondDescriptionWelcomeDialog = ref<string>('Welcome to Qiscus');
  const descriptionWelcomeDialog = ref<string>('Ask for Questions');
  const appearDelayWelcomeDialog = ref<string>('');
  const isAutoExpandWelcomeDialog = ref<boolean>(false);
  const isAttentionGrabberImage = ref<boolean>(true);
  const isAttentionGrabberText = ref<boolean>(true);
  const attentionGrabberTextDescription = ref<string>('');
  const attentionGrabberAppearDelay = ref<string>('');
  const attentionGrabberImage = ref<string>('');
  const brandIconWelcomeDialog = ref<string>('');
  const actionsWelcomeDialog = ref<IActionWelcomeDialog[]>([
    {
      label: 'Ask for Questions',
      iconUrl: '',
    },
  ]);
  // state for login form
  const firstDescriptionLoginForm = ref<string>('Hello There,');
  const secondDescriptionLoginForm = ref<string>('Welcome to Qiscus');
  const subtitleLoginForm = ref<string>('Please fill the details below before chatting with us!');
  const buttonFormLoginForm = ref<string>('');
  const customerIdentifierLoginForm = ref<string>('');
  const additionalFieldLoginForm = ref<IAdditionalField[]>([]);

  const customerIdentifierOptions = ref<{ label: string; value: string }[]>([
    {
      label: 'Email',
      value: 'email',
    },
    {
      label: 'Phone Number',
      value: 'phone',
    },
  ]);
  const fieldTypeOptionsAdditionalField = ref<{ text: string; value: string }[]>([
    {
      text: 'Input Text',
      value: 'input',
    },
    {
      text: 'Text Area',
      value: 'textarea',
    },
    {
      text: 'Dropdown',
      value: 'dropdown',
    },
  ]);
  const iconsAdditionalField = ref<{ name: string; icon: IconName }[]>([
    {
      name: 'Date',
      icon: 'date',
    },
    {
      name: 'Location',
      icon: 'pin',
    },
    {
      name: 'Briefcase',
      icon: 'briefcase',
    },
    {
      name: 'Globe',
      icon: 'globe',
    },
    {
      name: 'Phone',
      icon: 'phone',
    },
  ]);
  // state for chat form
  const customerServiceNameChatForm = ref<string>('');
  const customerServiceAvatarChatForm = ref<string>('');

  // GETTERS

  // ACTIONS
  const addChannel = (channel: WidgetChannelCreateData): void => {
    const newId = Math.max(...channelList.value.map((item) => item.id), 0) + 1;
    const newChannel: IWidgetChannel = {
      id: newId,
      ...channel,
    };
    channelList.value.push(newChannel);
  };

  const removeChannel = (channelId: number) => {
    const index = channelList.value.findIndex((channel) => channel.id === channelId);
    if (index !== -1) {
      channelList.value.splice(index, 1);
    }
  };

  const updateChannel = (channelId: number, updatedData: WidgetChannelUpdateData): void => {
    const index = channelList.value.findIndex((channel) => channel.id === channelId);
    if (index !== -1 && channelList.value[index]) {
      // TypeScript akan memastikan kita hanya update field yang valid
      Object.assign(channelList.value[index], updatedData);
    }
  };

  const addQiscusLiveChatChannel = () => {
    // check if qiscus live chat channel already exists
    const existingChannel = channelList.value.find((channel) => channel.icon === 'qiscus');

    if (!existingChannel) {
      const newId = Math.max(...channelList.value.map((item) => item.id), 0) + 1;
      const qiscusChannel: IWidgetChannel = {
        id: newId,
        icon: 'qiscus',
        name: previewLiveChatName.value || 'Live Chat',
        enabled: true,
        link: '',
      };
      channelList.value.push(qiscusChannel);
    }
  };

  const removeQiscusLiveChatChannel = () => {
    // remove channel with icon qiscus
    const index = channelList.value.findIndex((channel) => channel.icon === 'qiscus');
    if (index !== -1) {
      channelList.value.splice(index, 1);
    }
  };

  // actions for welcome dialog
  const resetWelcomeDialogState = () => {
    isWelcomeDialog.value = true;
    isAttentionGrabber.value = false;
    firstDescriptionWelcomeDialog.value = 'Hello There,';
    secondDescriptionWelcomeDialog.value = 'Welcome to Qiscus';
    descriptionWelcomeDialog.value = 'Ask for Questions';
    appearDelayWelcomeDialog.value = '';
    isAutoExpandWelcomeDialog.value = false;
    isAttentionGrabberImage.value = true;
    isAttentionGrabberText.value = true;
    attentionGrabberTextDescription.value = '';
    attentionGrabberAppearDelay.value = '';
    attentionGrabberImage.value = '';
    brandIconWelcomeDialog.value = '';
    actionsWelcomeDialog.value = [
      {
        label: 'Ask for Questions',
        iconUrl: '',
      },
    ];
  };

  // actions for login form
  const resetLoginFormState = () => {
    firstDescriptionLoginForm.value = 'Hello There,';
    secondDescriptionLoginForm.value = 'Welcome to Qiscus';
    subtitleLoginForm.value = 'Please fill the details below before chatting with us!';
    buttonFormLoginForm.value = '';
    customerIdentifierLoginForm.value = '';
    additionalFieldLoginForm.value = [];
  };

  // actions for chat form
  const resetChatFormState = () => {
    customerServiceNameChatForm.value = '';
    customerServiceAvatarChatForm.value = '';
  };

  // Watch previewLiveChatName for update qiscus live chat channel name
  watch(previewLiveChatName, (newName) => {
    const qiscusChannel = channelList.value.find((channel) => channel.icon === 'qiscus');
    if (qiscusChannel) {
      qiscusChannel.name = newName || 'Live Chat';
    }
  });

  // Watch isQiscusLiveChat for automatically add/remove channel
  watch(isQiscusLiveChat, (newValue, oldValue) => {
    if (newValue && !oldValue) {
      // When enabled, add qiscus live chat channel
      addQiscusLiveChatChannel();
    } else if (!newValue && oldValue) {
      // When disabled, remove qiscus live chat channel
      removeQiscusLiveChatChannel();
    }
  });

  return {
    // State
    isChannelsEnabled,
    isQiscusLiveChat,
    previewTitle,
    previewSubtitle,
    previewIntroduction,
    previewLiveChatName,
    channelName,
    channelLink,
    channelBadgeIcon,
    channelList,
    // state for welcome dialog
    isWelcomeDialog,
    isAttentionGrabber,
    firstDescriptionWelcomeDialog,
    secondDescriptionWelcomeDialog,
    descriptionWelcomeDialog,
    appearDelayWelcomeDialog,
    isAutoExpandWelcomeDialog,
    isAttentionGrabberImage,
    isAttentionGrabberText,
    attentionGrabberTextDescription,
    attentionGrabberAppearDelay,
    attentionGrabberImage,
    brandIconWelcomeDialog,
    actionsWelcomeDialog,
    // state for login form
    firstDescriptionLoginForm,
    secondDescriptionLoginForm,
    subtitleLoginForm,
    buttonFormLoginForm,
    customerIdentifierLoginForm,
    additionalFieldLoginForm,
    customerIdentifierOptions,
    fieldTypeOptionsAdditionalField,
    iconsAdditionalField,
    // state for chat form
    customerServiceNameChatForm,
    customerServiceAvatarChatForm,

    // Getters

    // Actions
    addChannel,
    removeChannel,
    updateChannel,
    addQiscusLiveChatChannel,
    removeQiscusLiveChatChannel,
    // actions for welcome dialog
    resetWelcomeDialogState,
    // actions for login form
    resetLoginFormState,
    // actions for chat form
    resetChatFormState,
  };
});
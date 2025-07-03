import { defineStore } from 'pinia';
import { reactive, ref, watch } from 'vue';

import { qiscusApi } from '@/api/channels';
import type { IconName } from '@/components/icons/Icon.vue';
import type {
  IWidgetChannel,
  WidgetChannelCreateData,
  WidgetChannelUpdateData,
} from '@/pages/integration/widget/widget-builder/channels/channels';
import type {
  ICallToActionState,
  IChatFormState,
  ILoginFormState,
  IWelcomeDialogState,
  IWidgetConfigResponse,
  IWidgetVariables,
} from '@/types/live-chat';

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
  // state for call to action
  const callToActionState = reactive<ICallToActionState>({
    isWithText: true,
    isWithIcon: true,
    liveChatButtonText: '',
    iconImage: "https://s3-ap-southeast-1.amazonaws.com/qiscus-sdk/public/qismo/img/icon-qiscus-widget-default.svg",
    borderRadius: '',
  });
  // state for welcome dialog
  const welcomeDialogState = reactive<IWelcomeDialogState>({
    isWelcomeDialog: true,
    isAttentionGrabber: false,
    firstDescriptionWelcomeDialog: 'Hello There,',
    secondDescriptionWelcomeDialog: 'Welcome to Qiscus',
    descriptionWelcomeDialog: 'Ask for Questions',
    welcomeTimeout: '',
    openAtStart: false,
    isAttentionGrabberImage: true,
    isAttentionGrabberText: true,
    attentionGrabberText: '',
    grabberTimeout: 0,
    attentionGrabberImage: '',
    brandIconWelcomeDialog: '',
    actionsWelcomeDialog: [
      {
        label: 'Ask for Questions',
        iconUrl: '',
      },
    ],
  });
  // state for login form
  const loginFormState = reactive<ILoginFormState>({
    firstDescription: 'Hello There,',
    secondDescription: 'Welcome to Qiscus',
    formSubtitle: 'Please fill the details below before chatting with us!',
    buttonText: '',
    customerIdentifier: '',
    extraFields: [],
  });

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
  const chatFormState = reactive<IChatFormState>({
    customerServiceName: '',
    customerServiceAvatar: '',
  });

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

  const getWidgetConfig = async (appId: string, channelId: string) => {
    try {
      const { data } = await qiscusApi.getWidgetConfig(appId, channelId);
      if(data) {
        console.log(data.data, 'data')
        const widget : IWidgetVariables = data.data.widget.variables;

        // set state welcome dialog
        welcomeDialogState.isWelcomeDialog = widget.welcomeMessageStatus;
        welcomeDialogState.isAttentionGrabber = widget.attentionGrabberStatus;
        welcomeDialogState.firstDescriptionWelcomeDialog = widget.welcomeText;
        // welcomeDialogState.secondDescriptionWelcomeDialog = ???;
        // welcomeDialogState.descriptionWelcomeDialog = ???
        welcomeDialogState.welcomeTimeout = widget.welcomeTimeout;
        welcomeDialogState.openAtStart = widget.openAtStart;
        welcomeDialogState.isAttentionGrabberImage = widget.grabberImage;
        welcomeDialogState.isAttentionGrabberText = widget.grabberTextStatus;
        welcomeDialogState.attentionGrabberText = widget.attentionGrabberText;
        welcomeDialogState.grabberTimeout = widget.grabberTimeout;
        // welcomeDialogState.brandIconWelcomeDialog = ???
        welcomeDialogState.attentionGrabberImage = widget.attentionGrabberImage;

        // set state call to action

        // set state channel widget

        // set state login form
        loginFormState.firstDescription = widget.formGreet;
        // loginFormState.secondDescription = ???;
        loginFormState.formSubtitle = widget.formSubtitle;
        loginFormState.buttonText = widget.buttonText;
        loginFormState.customerIdentifier = widget.customerIdentifierInputType;
        loginFormState.extraFields = widget.extra_fields ?? [];

        // set state chat form
        chatFormState.customerServiceName = widget.customerServiceName;
        chatFormState.customerServiceAvatar = widget.customerServiceAvatar;

        // set state color
      }
    } catch (error) {
      console.error(error);
    }
  };

  const postWidgetConfig = async (appId: string, channelId: string) => {
    const payload : IWidgetConfigResponse = {
      style: {},
      widget: {
        variables: {
          appID: appId,
          // welcome dialog data
          welcomeMessageStatus: welcomeDialogState.isWelcomeDialog,
          attentionGrabberStatus: welcomeDialogState.isAttentionGrabber,
          welcomeText: welcomeDialogState.firstDescriptionWelcomeDialog,
          welcomeTimeout: welcomeDialogState.welcomeTimeout,
          openAtStart: welcomeDialogState.openAtStart,
          grabberImage: welcomeDialogState.isAttentionGrabberImage,
          grabberTextStatus: welcomeDialogState.isAttentionGrabberText,
          attentionGrabberText: welcomeDialogState.attentionGrabberText,
          grabberTimeout: welcomeDialogState.grabberTimeout,
          attentionGrabberImage: welcomeDialogState.attentionGrabberImage,
          
          // login form data
          formGreet: loginFormState.firstDescription,
          formSubtitle: loginFormState.formSubtitle,
          buttonText: loginFormState.buttonText,
          customerIdentifierInputType: loginFormState.customerIdentifier,
          extra_fields: loginFormState.extraFields,

          // chat form data
          customerServiceName: chatFormState.customerServiceName,
          customerServiceAvatar: chatFormState.customerServiceAvatar,

          // call to action data
          buttonHasText: callToActionState.isWithText,
          buttonHasIcon: callToActionState.isWithIcon,
          buttonIcon: callToActionState.iconImage,
          loginFormButtonLabel: callToActionState.liveChatButtonText,

          // channel widget data
          channel_widget: {
            live_channel: {
              badge_url: channelBadgeIcon.value || 'https://d1edrlpyc25xu0.cloudfront.net/zalda-vvq7pksvblaiy7s/image/upload/U5zXXEv54V/file_example_PNG_500kB.png"',
              is_enable: isQiscusLiveChat.value,
              name: previewLiveChatName.value
            },
            other_channel: [], //???
            subtitle: previewSubtitle.value,
            title: previewTitle.value,
          },          
          isChannelWidgetEnabled: isChannelsEnabled.value,
          
          selectedWidgetPage: 'welcome'
        }
      }
    }
    console.log(payload, 'payload');
    try {
      const { data } = await qiscusApi.postWidgetConfig(channelId, payload);
      if(data) {
        console.log(data, 'data')
      }
    } catch (error) {
      console.error(error);
    }
  }

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
    // state for call to action
    callToActionState,
    // state for welcome dialog
    welcomeDialogState,
    // state for login form
    loginFormState,
    customerIdentifierOptions,
    fieldTypeOptionsAdditionalField,
    iconsAdditionalField,
    // state for chat form
    chatFormState,
    // Getters

    // Actions
    addChannel,
    removeChannel,
    updateChannel,
    addQiscusLiveChatChannel,
    removeQiscusLiveChatChannel,
    getWidgetConfig,
    postWidgetConfig,
  };
});
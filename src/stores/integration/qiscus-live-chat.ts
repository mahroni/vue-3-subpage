import { defineStore } from 'pinia';
import { reactive, ref, watch } from 'vue';

import { qiscusApi } from '@/api/channels';
import type { IconName } from '@/components/icons/Icon.vue';
import type {
  IWidgetChannel,
  WidgetChannelCreateData,
  WidgetChannelUpdateData,
} from '@/features/widget-builder/channels/channels';
import type {
  ICallToActionState,
  IChatFormState,
  ILoginFormState,
  IWelcomeDialogState,
  IWidgetVariables,
} from '@/types/live-chat';

export const useQiscusLiveChatStore = defineStore('create-qiscus-live-chat', () => {
  const channelList = ref<IWidgetChannel[]>([
    { id: 1, icon: 'whatsapp', name: 'Whatsapp', enabled: true, link: '' },
    { id: 2, icon: 'facebook', name: 'Facebook', enabled: false, link: '' },
    { id: 3, icon: 'line', name: 'Line', enabled: false, link: '' },
    { id: 4, icon: 'telegram', name: 'Telegram', enabled: false, link: '' },
    { id: 6, icon: 'tiktok', name: 'Tiktok', enabled: true, link: '' },
  ]);

  const colorWidgetState = ref<string>('#01416C');

  // state for Channel Widget
  const channelState = reactive({
    isChannelsEnabled: false,
    isQiscusLiveChat: false,
    previewTitle: 'Ask for Question',
    previewSubtitle: 'In Everythings!',
    previewIntroduction: 'More personalized chat with us on:',
    previewLiveChatName: 'Live Chat',
    channelName: '',
    channelLink: '',
    channelBadgeIcon: '',
  });

  // state for call to action
  const callToActionState = reactive<ICallToActionState>({
    isWithText: true,
    isWithIcon: true,
    liveChatButtonText: 'Talk To Us',
    iconImage:
      'https://s3-ap-southeast-1.amazonaws.com/qiscus-sdk/public/qismo/img/icon-qiscus-widget-default.svg',
    borderRadius: '32',
  });
  // state for welcome dialog
  const welcomeDialogState = reactive<IWelcomeDialogState>({
    isWelcomeDialog: true,
    isAttentionGrabber: false,
    firstDescriptionWelcomeDialog: 'Hello There,',
    secondDescriptionWelcomeDialog: 'Welcome to Qiscus!',
    descriptionWelcomeDialog: 'Ask for Questions',
    welcomeTimeout: '',
    openAtStart: false,
    isAttentionGrabberImage: true,
    isAttentionGrabberText: true,
    attentionGrabberText: 'Hello, there is Promo!',
    grabberTimeout: null,
    attentionGrabberImage:
      'https://d1edrlpyc25xu0.cloudfront.net/zalda-vvq7pksvblaiy7s/image/upload/U5zXXEv54V/file_example_PNG_500kB.png',
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
    brandLogo: '',
    firstDescription: 'Hello There,',
    secondDescription: 'Welcome to Qiscus',
    formSubtitle: 'Please fill the details below before chatting with us!',
    buttonText: 'Start Chat',
    customerIdentifier: 'email',
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
    customerServiceName: 'Qiscus Customer Care',
    customerServiceAvatar:
      'https://d1edrlpyc25xu0.cloudfront.net/zalda-vvq7pksvblaiy7s/image/upload/U5zXXEv54V/file_example_PNG_500kB.png',
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
        name: channelState.previewLiveChatName || 'Live Chat',
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
      if (data) {
        console.log(data.data, 'data');
        const widget: IWidgetVariables = data.data.widget.variables;

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
    const payload: any = {
      style: {},
      widget: {
        variables: {
          appID: appId,
          // welcome dialog data
          welcomeMessageStatus: welcomeDialogState.isWelcomeDialog,
          attentionGrabberStatus: welcomeDialogState.isAttentionGrabber,
          welcomeText: welcomeDialogState.firstDescriptionWelcomeDialog,
          firstDescriptionWelcomeDialog: welcomeDialogState.firstDescriptionWelcomeDialog, //=> new data
          secondDescriptionWelcomeDialog: welcomeDialogState.secondDescriptionWelcomeDialog, //=> new data
          descriptionWelcomeDialog: welcomeDialogState.descriptionWelcomeDialog, //=> new data
          welcomeTimeout: welcomeDialogState.welcomeTimeout,
          openAtStart: welcomeDialogState.openAtStart,
          grabberImage: welcomeDialogState.isAttentionGrabberImage,
          grabberTextStatus: welcomeDialogState.isAttentionGrabberText,
          attentionGrabberText: welcomeDialogState.attentionGrabberText,
          grabberTimeout: welcomeDialogState.grabberTimeout ?? 0,
          attentionGrabberImage: welcomeDialogState.attentionGrabberImage,
          brandIconWelcomeDialog: welcomeDialogState.brandIconWelcomeDialog, //=> new data
          // actionsWelcomeDialog: welcomeDialogState.actionsWelcomeDialog, //=> new data

          // login form data
          formGreet: loginFormState.firstDescription,
          firstDescription: loginFormState.firstDescription, //=> new data
          secondDescription: loginFormState.secondDescription, //=> new data
          formSubtitle: loginFormState.formSubtitle,
          buttonText: loginFormState.buttonText,
          customerIdentifierInputType: loginFormState.customerIdentifier,
          extra_fields: loginFormState.extraFields,
          brandLogo: loginFormState.brandLogo, //=> new data

          // chat form data
          customerServiceName: chatFormState.customerServiceName,
          customerServiceAvatar: chatFormState.customerServiceAvatar,

          // call to action data
          buttonHasText: callToActionState.isWithText,
          buttonHasIcon: callToActionState.isWithIcon,
          buttonIcon: callToActionState.iconImage,
          loginFormButtonLabel: callToActionState.liveChatButtonText,
          borderRadius: callToActionState.borderRadius, //=> new data

          // channel widget data
          isChannelWidgetEnabled: channelState.isChannelsEnabled,
          channel_widget: {
            title: channelState.previewTitle,
            subtitle: channelState.previewSubtitle,
            introduction: channelState.previewIntroduction, //=> new data
            live_channel: {
              name: channelState.previewLiveChatName,
              is_enable: channelState.isQiscusLiveChat,
              badge_url:
                channelState.channelBadgeIcon ||
                'https://d1edrlpyc25xu0.cloudfront.net/zalda-vvq7pksvblaiy7s/image/upload/U5zXXEv54V/file_example_PNG_500kB.png"',
            },
            other_channel: channelList.value,
          },
          colorWidget: colorWidgetState.value, //=> new data
          selectedWidgetPage: 'welcome',
        },
      },
    };
    console.log(payload, 'payload');
    try {
      const { data } = await qiscusApi.postWidgetConfig(channelId, payload);
      if (data) {
        console.log(data, 'data');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Watch previewLiveChatName for update qiscus live chat channel name
  watch(
    () => channelState.previewLiveChatName,
    (newName) => {
      const qiscusChannel = channelList.value.find((channel) => channel.icon === 'qiscus');
      if (qiscusChannel) {
        qiscusChannel.name = newName || 'Live Chat';
      }
    }
  );

  // Watch isQiscusLiveChat for automatically add/remove channel
  watch(
    () => channelState.isQiscusLiveChat,
    (newValue: boolean, oldValue: boolean) => {
      if (newValue && !oldValue) {
        // When enabled, add qiscus live chat channel
        addQiscusLiveChatChannel();
      } else if (!newValue && oldValue) {
        // When disabled, remove qiscus live chat channel
        removeQiscusLiveChatChannel();
      }
    }
  );

  return {
    // state for color widget
    colorWidgetState,
    // state for list channel widget
    channelList,
    // state for channel widget
    channelState,
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

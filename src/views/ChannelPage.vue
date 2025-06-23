<template>
  <div class="min-h-screen flex flex-col px-12 py-8 text-text-title text-sm gap-8">
    <div>
      <div class="flex gap-3 mb-4">
        <img src="../assets/icon-integration.svg" alt="Qiscus Logo" />
        <h2 class="text-text-title font-semibold text-xl">Integration Channel</h2>
      </div>
      <p class="text-text-subtitle">
        Choose your first channel to connect with by click a channel icon below to start connecting
        with your customers. To learn more regarding Qiscus Omnichannel Chat integration and
        tutorial, you can watch tutorial video demo in
        <a
          href="//drive.google.com/drive/folders/1JxTfQEkWK2v0MlViZ_YYTNOLDDo6dZPH"
          target="_blank"
          rel="noopener noreferrer"
          >this link</a
        >.
      </p>
    </div>

    <nav>
      <ul class="flex">
        <li
          v-for="tab in dataTabs"
          :key="tab.id"
          :class="{ active: activeTab.id === tab.id }"
          class="tab"
        >
          <button
            class="cursor-pointer px-5 py-2"
            :class="{ 'font-semibold': activeTab.id === tab.id }"
            @click="onSelectTab(tab)"
          >
            {{ tab.name }}
          </button>
        </li>
      </ul>
    </nav>

    <div class="grid grid-cols-3 gap-8">
      <template v-for="channel in filteredChannels" :key="channel.id">
        <div
          class="card cursor-pointer border border-gray-300 flex flex-col p-6 gap-3 rounded-2xl bg-white-100 max-w-md"
          @click.prevent="onSelectChannel(channel)"
          :class="channel.id"
        >
          <div class="flex items-center justify-between text-sm font-semibold z-10">
            <div class="flex items-center gap-3">
              <img class="w-10 h-10" :src="channel.icon" loading="lazy" />
              {{ channel.name }}
            </div>
            <badge intent="progress">Popular</badge>
          </div>
          <div class="text-text-subtitle text-sm font-normal z-10">
            {{ channel.description }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import Badge from '../components/common/Badge.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const dataTabs = [
  {
    id: 'all',
    name: 'All',
  },
  {
    id: 'business_messaging',
    name: 'Business Messaging',
  },
  {
    id: 'live_chat',
    name: 'Live Chat',
  },
  {
    id: 'other',
    name: 'Other',
  },
];
const activeTab = ref(dataTabs[0]);

const channels = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    group: 'business_messaging',
    icon: 'https://omnichannel.qiscus.com/img/whatsapp_badge.svg',
    description:
      'Send personalized replies or broadcast messages to hundreds of customers in just a few clicks using WhatsApp.',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    group: null,
    icon: 'https://omnichannel.qiscus.com/img/instagram_badge.svg',
    description:
      'Easily manage Instagram DMs and story replies from your omnichannel inbox, without opening app.',
  },
  {
    id: 'tiktok',
    name: 'Tiktok',
    group: 'business_messaging',
    icon: 'https://omnichannel.qiscus.com/img/tiktok_badge.svg',
    description:
      'Connect your TikTok business account to easily reply to DMs from your omnichannel inbox.',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    group: null,
    icon: 'https://omnichannel.qiscus.com/img/messenger_badge.svg',
    description:
      'Manage all your Facebook Page messages efficiently, right from your omnichannel inbox.',
  },
  {
    id: 'line',
    name: 'LINE',
    group: null,
    icon: 'https://omnichannel.qiscus.com/img/line_badge.svg',
    description: 'Connect your LINE Account to manage chats easily from your omnichannel inbox.',
  },
  {
    id: 'telegram',
    name: 'Telegram',
    group: null,
    icon: 'https://omnichannel.qiscus.com/img/telegram_badge.svg',
    description:
      'Connect your Telegram account and easily manage all conversations from your omnichannel inbox.',
  },
  {
    id: 'qiscus',
    name: 'Qiscus Widget',
    group: 'live_chat',
    icon: 'https://omnichannel.qiscus.com/img/qiscus_badge.svg',
    description:
      'Engage customers in real time through a customizable and visually appealing live chat widget on your website.',
  },
  {
    id: 'custom_channel',
    name: 'Custom Channel',
    group: 'other',
    icon: 'https://omnichannel.qiscus.com/img/custom.svg',
    description:
      'Build a custom channel that fits your needs—like Tokopedia, Shopee, Email, and more.',
  },
  {
    id: 'bot_integration',
    name: 'Bot Integration',
    group: 'other',
    icon: 'https://omnichannel.qiscus.com/img/bot_badge.svg',
    description:
      'Enable and manage bots to assist with customer inquiries across all your connected channel.',
  },
];

function onSelectTab(tab) {
  activeTab.value = tab;
}

const filteredChannels = computed(() => {
  if (activeTab.value.id === 'all') {
    return channels;
  }
  return channels.filter((channel) => channel.group === activeTab.value.id);
});
const onSelectChannel = (channel) => {
  // Emit an event or handle the channel selection logic here
  console.log('Selected channel:', channel);
  // Redirect to the Qiscus Widget setup page
  router.push({
    name: channel.id,
  });
};
</script>
<style scoped>
.tab {
  position: relative;
}

.tab::before {
  background-color: transparent;
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 4px;
  border-radius: 10px 10px 0px 0px;
}

.active::before {
  background-color: #27b199;
}

.card {
  position: relative;
  overflow: hidden;
}

.card:hover {
  border-color: #27b199;
}

.card::after {
  content: '';
  position: absolute;
  left: -162px;
  bottom: -54px;
  width: 260px;
  height: 260px;
  filter: blur(115px);
  opacity: 0.2;
}

.card.whatsapp::after {
  background-image: url('https://omnichannel.qiscus.com/img/whatsapp_badge.svg');
  background-size: cover;
}
.card.instagram::after {
  background-image: url('https://omnichannel.qiscus.com/img/instagram_badge.svg');
  background-size: cover;
}
.card.tiktok::after {
  background-image: url('https://omnichannel.qiscus.com/img/tiktok_badge.svg');
  background-size: cover;
}
.card.facebook::after {
  background-image: url('https://omnichannel.qiscus.com/img/messenger_badge.svg');
  background-size: cover;
}
.card.line::after {
  background-image: url('https://omnichannel.qiscus.com/img/line_badge.svg');
  background-size: cover;
}
.card.telegram::after {
  background-image: url('https://omnichannel.qiscus.com/img/telegram_badge.svg');
  background-size: cover;
}
.card.qiscus::after {
  background-image: url('https://omnichannel.qiscus.com/img/qiscus_badge.svg');
  background-size: cover;
}
.card.custom_channel::after {
  background-image: url('https://omnichannel.qiscus.com/img/custom.svg');
  background-size: cover;
}
.card.bot_integration::after {
  background-image: url('https://omnichannel.qiscus.com/img/bot_badge.svg');
  background-size: cover;
}
</style>

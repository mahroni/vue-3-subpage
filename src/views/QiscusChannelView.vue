<template>
  <h1>Halo</h1>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import { useAppConfigStore } from '../stores/app-config';
import { useChannelsStore } from '../stores/channels';

const appConfigStore = useAppConfigStore();

appConfigStore.setConfig({
  userToken: '1FNe6EiEUpRWJYoxlZe1',
  appId: 'zalda-vvq7pksvblaiy7s',
  appVersion: '1.0.0',
});

const channelsStore = useChannelsStore();

async function a() {
  await channelsStore.getChannels();
  const w = await channelsStore.getWhatsappChannels();
  console.log(w);
}

a();

onMounted(async () => {
  await a();
});
</script>

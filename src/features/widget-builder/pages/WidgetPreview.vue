<script setup lang="ts">
import { onMounted } from 'vue';

import { useAppConfigStore } from '@/stores/app-config';

const props = defineProps<{
  channelId: string | number;
}>();
const { appId } = useAppConfigStore();
const isStaging = import.meta.env.VITE_WIDGET_ENV === 'staging';
const isLatest = import.meta.env.VITE_WIDGET_ENV === 'latest';
const baseUrl = import.meta.env.VITE_BASE_URL || '';
const iframeUrl = import.meta.env.VITE_IFRAME_URL || '';

onMounted(() => {
  let configs: {
    options: {
      channel_id: string | number;
      mobileBreakPoint: number;
      extra_fields: never[];
      [key: string]: any;
    };
    staging?: boolean;
  } = {
    options: {
      channel_id: props.channelId,
      mobileBreakPoint: 400,
      extra_fields: [],
    },
  };

  if (isStaging) {
    configs.staging = true;
  }

  if (isLatest) {
    configs.options.appVersion = 'latest';
  }

  if (baseUrl) configs.options.baseUrl = baseUrl;
  if (iframeUrl) configs.options.qismoIframeUrl = iframeUrl;

  const qismoScriptSrc = 'https://qismo-stag4.qiscus.io/js/qismo-v5.js';
  const existingScript = document.querySelector(`script[src="${qismoScriptSrc}"]`);

  // Check if the script already exists
  if (existingScript) {
    console.log('Qismo script already exists. Removing and re-adding to ensure fresh load.');
    existingScript.remove(); // Remove the existing script
  }

  // Create a new script element
  const script = document.createElement('script');
  script.src = qismoScriptSrc;
  script.async = true; // Always load asynchronously

  script.onload = () => {
    // @ts-ignore
    const Qismo = window.Qismo;
    if (Qismo) {
      console.log('Qismo script loaded successfully. Initializing Qismo...');
      try {
        new Qismo(appId, configs);
        console.log('Qismo initialized with provided appId and configs.');
      } catch (e) {
        console.error('Error initializing Qismo:', e);
      }
    } else {
      console.error('Qismo object (window.Qismo) not found after script loaded.');
    }
  };

  script.onerror = () => {
    console.error(`Failed to load Qismo script from: ${qismoScriptSrc}`);
  };

  // Append the new script to the head
  document.head.appendChild(script);
});
</script>

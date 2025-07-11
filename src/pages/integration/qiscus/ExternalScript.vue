<template>
  <div v-if="status === 'loading'">
    <p>Load script...</p>
  </div>
  <div v-else-if="status === 'error'">
    <p>Error load script. Please try again.</p>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(['loaded', 'error']);
const status = ref('loading');
let scriptElement = null;

onMounted(() => {
  if (document.querySelector(`script[src="${props.src}"]`)) {
    status.value = 'loaded';
    emit('loaded');
    console.warn(`Script [${props.src}] sudah dimuat sebelumnya.`);
    return;
  }

  // create new script element
  scriptElement = document.createElement('script');
  scriptElement.src = props.src;
  scriptElement.async = true;

  // add to <head>
  document.head.appendChild(scriptElement);

  // Handler script success load
  scriptElement.onload = () => {
    status.value = 'loaded';
    console.log(`Script [${props.src}] berhasil dimuat.`);
    emit('loaded');
  };

  // Handler if error
  scriptElement.onerror = () => {
    status.value = 'error';
    console.error(`Gagal memuat script [${props.src}].`);
    emit('error');
  };
});

onBeforeUnmount(() => {
  if (scriptElement && document.head.contains(scriptElement)) {
    document.head.removeChild(scriptElement);
  }
});
</script>

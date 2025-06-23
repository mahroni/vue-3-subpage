<template>
  <div
    class="min-h-screen flex flex-col px-12 py-8 text-text-title text-sm gap-8">
    <div class="flex gap-3">
      <img
        src="https://omnichannel.qiscus.com/img/qiscus_badge.svg"
        alt="Qiscus Logo" />
      <h2 class="text-text-title font-semibold text-xl">
        New Integration - Qiscus Live Chat
      </h2>
    </div>
    <MainTab :tabs="tabs" v-model="activeTab" />

    <!-- ini pakai v-if -->
    <div v-if="activeTab === 'Settings'">
      <p>Overview content goes here.</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import MainTab from "../components/common/Tabs/MainTab.vue";

const tabs = ["Overview", "Live Chat Builder", "Code Installation", "Settings"];
const activeTab = ref(tabs[0] || "overview");
</script>

<template>
  <div class="text-text-title flex min-h-screen flex-col gap-8 px-12 py-8 text-sm">
    <div class="flex gap-3">
      <img src="https://omnichannel.qiscus.com/img/qiscus_badge.svg" alt="Qiscus Logo" />
      <h2 class="text-text-title text-xl font-semibold">New Integration - Qiscus Live Chat</h2>
    </div>
    <Banner intent="negative" type="outline">
      <div class="flex items-center gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="19"
          viewBox="0 0 22 19"
          fill="none"
        >
          <path
            d="M9.36333 1.9041L1.25653 15.1827C1.08938 15.4667 1.00094 15.7887 1.00001 16.1167C0.999072 16.4446 1.08567 16.7671 1.25119 17.052C1.41671 17.3369 1.65538 17.5744 1.94346 17.7407C2.23153 17.907 2.55897 17.9964 2.8932 18H19.1068C19.441 17.9964 19.7685 17.907 20.0565 17.7407C20.3446 17.5744 20.5833 17.3369 20.7488 17.052C20.9143 16.7671 21.0009 16.4446 21 16.1167C20.9991 15.7887 20.9106 15.4667 20.7435 15.1827L12.6367 1.9041C12.466 1.62811 12.2258 1.39992 11.9391 1.24156C11.6524 1.0832 11.329 1 11 1C10.671 1 10.3476 1.0832 10.0609 1.24156C9.7742 1.39992 9.53395 1.62811 9.36333 1.9041V1.9041Z"
            stroke="#EB5757"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11 7V11"
            stroke="#EB5757"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11 15H11.01"
            stroke="#EB5757"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div>Auto Responder is not working if the chatbot setting is enabled.</div>
      </div>
    </Banner>
    <Banner intent="positive">
      <div class="flex flex-col gap-[20px]">
        <div>
          <strong>Channel Auto Responder</strong> allows system to reply messages received in this
          channel according to operating hours. Admin can set the autoresponder message when
          services are both in the during and outside the office hour.
        </div>
        <div>
          To set the office hour, please go to the settings menu in the General - Office Hour
          section.
        </div>
      </div>
    </Banner>
    <div
      class="bg-white-100 flex w-full flex-col gap-6 rounded-lg p-6"
      style="box-shadow: 0px 4px 12px 0px rgba(10, 10, 10, 0.1)"
    >
      <div class="text-text-title font-semibold">
        Channel Auto Responder 
        <span class="text-text-placeholder font-normal">(Optional)</span>
      </div>
      <Banner intent="positive">
        <div class="flex flex-col gap-[20px]">
          Note: If you activate this autoresponder then the autoresponder setting on the Settings -
          General page will not be active
        </div>
      </Banner>

      <div class="flex flex-col gap-2">
        <div class="text-text-subtitle">Channel Auto Responder During Office Hour</div>
        <div class="text-xs" style="color: #a0a0a0">
          When you set the auto responder message, it will only be sent once for one conversation
          room on office hour.
        </div>
        <textarea
          class="resize-none rounded-lg p-4 outline-0"
          rows="3"
          placeholder="Text input"
          style="box-shadow: 0px 2px 8px 0px rgba(10, 10, 10, 0.1)"
        ></textarea>
      </div>
      <Checkbox
        v-model="isChecked"
        label="Keep sending every time a customer initiates a chat session even though the room has been resolved"
      />

      <hr class="border-t border-gray-300" />

      <div class="flex flex-col gap-2">
        <div class="text-text-subtitle">Channel Auto Responder Outside Office Hour</div>
        <div class="text-xs" style="color: #a0a0a0">
          When you set the autoresponder message, it will only be sent once at the beginning of each
          conversation outside office hour.
        </div>
        <textarea
          class="resize-none rounded-lg p-4 outline-0"
          rows="3"
          placeholder="Text input"
          style="box-shadow: 0px 2px 8px 0px rgba(10, 10, 10, 0.1)"
        ></textarea>
      </div>
      <Checkbox v-model="isChecked2" label="Sent every time a customer sends a message" />
    </div>
    <div class="flex justify-end gap-4">
      <Button shape="rounded" intent="secondary">Back</Button>
      <Button shape="rounded">Save Changes</Button>
    </div>
  </div>
</template>
<script setup lang="ts">
import Banner from '../components/common/Banner.vue';
import Checkbox from '../components/common/Checkbox.vue';
import Button from '../components/common/Button.vue';
import { ref } from 'vue';

const isChecked = ref(false);
const isChecked2 = ref(false);
</script>

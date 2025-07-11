<script setup lang="ts">
import Banner from '@/components/common/Banner.vue';
import CodeSnippet from '@/pages/integration/qiscus/CodeSnippet.vue';
import { useAppConfigStore } from '@/stores/app-config';

const BASE_URL = import.meta.env.VITE_BASE_URL || '/';

const { appId } = useAppConfigStore();

const jsCode = `
      document.addEventListener('DOMContentLoaded', function () {
        var s, t; s = document.createElement('script'); s.type = 'text/javascript';
        s.src = '${BASE_URL}/js/qismo-v5.js'; s.async = true;
        s.onload = s.onreadystatechange = function () {
          new Qismo('${appId}', {
            staging: true,
            options: {
              channel_id: 557,
              qismoIframeUrl: '${BASE_URL}', baseUrl: '${BASE_URL}',
              mobileBreakPoint:400,
              extra_fields: [],
            }
          });
        }
        t = document.getElementsByTagName('script')[0]; t.parentNode.insertBefore(s, t);
      })`;
</script>

<template>
  <Banner intent="positive" type="outline">
    <div>
      Copy the code below and paste it into the &lt;body&gt; tag of your website to install the
      Qiscus Live Chat.
    </div>
    <!-- <a href="javascript:void(0);" class="text-primary flex items-center gap-2">
      Copy Code
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1.45911 1.45911C1.57846 1.33977 1.74032 1.27273 1.90909 1.27273H7.63636C7.80514 1.27273 7.967 1.33977 8.08634 1.45911C8.20568 1.57846 8.27273 1.74032 8.27273 1.90909V2.54545C8.27273 2.89691 8.55764 3.18182 8.90909 3.18182C9.26054 3.18182 9.54545 2.89691 9.54545 2.54545V1.90909C9.54545 1.40277 9.34432 0.917183 8.98629 0.55916C8.62827 0.201136 8.14269 0 7.63636 0H1.90909C1.40277 0 0.917184 0.201136 0.55916 0.55916C0.201136 0.917184 0 1.40277 0 1.90909V7.63636C0 8.14269 0.201136 8.62827 0.55916 8.98629C0.917183 9.34432 1.40277 9.54545 1.90909 9.54545H2.54545C2.89691 9.54545 3.18182 9.26054 3.18182 8.90909C3.18182 8.55764 2.89691 8.27273 2.54545 8.27273H1.90909C1.74032 8.27273 1.57846 8.20568 1.45911 8.08634C1.33977 7.967 1.27273 7.80514 1.27273 7.63636V1.90909C1.27273 1.74032 1.33977 1.57846 1.45911 1.45911ZM5.72727 6.36364C5.72727 6.01218 6.01218 5.72727 6.36364 5.72727H12.0909C12.4424 5.72727 12.7273 6.01218 12.7273 6.36364V12.0909C12.7273 12.4424 12.4424 12.7273 12.0909 12.7273H6.36364C6.01218 12.7273 5.72727 12.4424 5.72727 12.0909V6.36364ZM6.36364 4.45455C5.30927 4.45455 4.45455 5.30927 4.45455 6.36364V12.0909C4.45455 13.1453 5.30927 14 6.36364 14H12.0909C13.1453 14 14 13.1453 14 12.0909V6.36364C14 5.30927 13.1453 4.45455 12.0909 4.45455H6.36364Z"
          fill="#27B199"
        />
      </svg>
    </a> -->
  </Banner>

  <CodeSnippet :code="jsCode" language="javascript" show-line-numbers />
</template>

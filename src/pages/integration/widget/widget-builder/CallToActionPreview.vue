<template>
  <div class="flex flex-1 flex-col items-end gap-4 p-6">
    <div
      class="flex w-90 flex-col items-start gap-0 rounded-4xl shadow-[0px_8px_32px_0px_rgba(10,10,10,0.12)]"
    >
      <!-- Top Skeleton -->
      <div class="flex w-full flex-col items-start gap-8 p-8">
        <div class="flex w-full flex-col items-start gap-6">
          <div class="bg-surface-disable aspect-square h-7.5 w-7.5 rounded-full"></div>

          <div class="flex w-full flex-col gap-3">
            <div class="bg-surface-disable h-4.5 w-37 rounded-full"></div>
            <div class="bg-surface-disable h-4.5 w-full rounded-full"></div>
          </div>
        </div>

        <div class="bg-surface-disable h-14 w-full rounded-xl"></div>
      </div>

      <!-- Bottom Skeleton -->
      <div
        class="border-stroke-regular flex w-full flex-col items-center justify-center rounded-b-4xl border-t px-8 py-2"
      >
        <!-- Message Bubble -->
        <div class="bg-surface-disable h-4.5 w-37 rounded-full"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<template>
    <div class="flex gap-4 w-full p-4">
        <div class="flex flex-col gap-4 bg-gray-200 w-1/2 p-6 border-[1px] border-gray-300 rounded-2xl">
            <ToggleLable label="Welcome Dialog" v-model="welcomeDialog" />
            <Divider />
            <TextArea label="First Description" />
            <Input label="Description" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import Input from '@/components/form/Input.vue';
import TextArea from '@/components/form/TextArea.vue';
import ToggleLable from '@/components/form/ToggleLable.vue';
import Divider from '@/components/ui/Divider.vue';
import { ref } from 'vue';

const welcomeDialog = ref(true)
</script>
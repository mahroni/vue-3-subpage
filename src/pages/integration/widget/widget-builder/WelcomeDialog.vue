<template>
    <WidgetFormLayout label="Welcome Dialog" v-model="welcomeDialog" isSwitch>
        <template #inputs>
            <ImageInput label="Brand Icon" id="welcome-dialog-image" tipsText="We recommend an image of at least 360x360 pixels. You can upload images in JPG, JPEG, or PNG format with a maximum size of 2MB." :showTips="true" />
            <TextArea v-model="welcomeDialogReact.firstDescription" label="First Description" />
            <TextArea v-model="welcomeDialogReact.secondDescription" label="Second Description" />
            <ImageInput label="Icon" id="welcome-dialog-icon" tipsText="We recommend an image of at least 360x360 pixels. You can upload images in JPG, JPEG, or PNG format with a maximum size of 2MB." :showTips="true" />
            <Input v-model="welcomeDialogReact.description" label="Description" />
            <InputCustom v-model="welcomeDialogReact.appearDelay" label="Appear Delay">
                <template #append-button>
                    <div class="text-sm font-medium text-text-title">
                        Seconds
                    </div>
                </template>
            </InputCustom>
            <Checkbox v-model="welcomeDialogReact.isMakeAutoExpand" label="Make Auto Expand" />
        </template>
    </WidgetFormLayout>
    
    <WidgetFormLayout label="Attention Grabber" v-model="attentionGrabber" isSwitch>
        <template #additional-info>
            <Banner intent="warning" type="solid">
                <div class="flex items-center gap-4">
                    <WarningIcon :size="24" class="text-negative-400" />
                    <span class="text-sm font-normal text-text-title">
                        Welcome dialog won't be rendered if attention grabber is active
                    </span>
                </div>
            </Banner>
        </template>
        <template #inputs>            
            <OptionalInput label="Image" v-model="welcomeDialogReact.isAttentionGrabberImage">
                <DragDropInput label="Upload Image" accept="image/png,image/jpg" acceptText="PNG or JPG" :maxSize="31457280" :maxFiles="5"/> 
            </OptionalInput>
            <OptionalInput label="Text" v-model="welcomeDialogReact.isAttentionGrabberText">
                <TextArea v-model="welcomeDialogReact.attentionGrabberTextDescription" label="Text Description" />
            </OptionalInput>
            <InputCustom v-model="welcomeDialogReact.attentionGrabberAppearDelay" label="Appear Delay">
                <template #append-button>
                    <div class="text-sm font-medium text-text-title">
                        Seconds
                    </div>
                </template>
            </InputCustom>
        </template>
    </WidgetFormLayout>
</template>

<script lang="ts" setup>
import Input from '@/components/form/Input.vue';
import TextArea from '@/components/form/TextArea.vue';
import WidgetFormLayout from '../form/WIdgetFormLayout.vue';
import { computed, reactive } from 'vue';
import DragDropInput from '@/components/form/DragDropInput.vue';
import OptionalInput from '../form/OptionalInput.vue';
import ImageInput from '@/components/form/ImageInput.vue';
import InputCustom from '@/components/form/InputCustom.vue';
import Checkbox from '@/components/common/Checkbox.vue';
import Banner from '@/components/common/Banner.vue';
import { WarningIcon } from '@/components/icons';

const welcomeDialogReact = reactive({
    isWelcomeDialog: true,
    isAttentionGrabber: false,
    firstDescription: '',
    secondDescription: '',
    description: '',
    appearDelay: '',
    isMakeAutoExpand: false,
    isAttentionGrabberImage: true,
    isAttentionGrabberText: true,
    attentionGrabberTextDescription: '',
    attentionGrabberAppearDelay: ''
})

const welcomeDialog = computed({
    get: () => welcomeDialogReact.isWelcomeDialog,
    set: (value: boolean) => {
        welcomeDialogReact.isWelcomeDialog = value;
        // If welcome dialog is turned on, turn off attention grabber
        if (value) {
            welcomeDialogReact.isAttentionGrabber = false;
        }
    }
});

const attentionGrabber = computed({
    get: () => welcomeDialogReact.isAttentionGrabber,
    set: (value: boolean) => {
        welcomeDialogReact.isAttentionGrabber = value;
        // If attention grabber is turned on, turn off welcome dialog
        if (value) {
            welcomeDialogReact.isWelcomeDialog = false;
        }
    }
});
</script>
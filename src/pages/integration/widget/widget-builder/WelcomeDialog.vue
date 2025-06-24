<template>
    <WidgetFormLayout label="Welcome Dialog" v-model="welcomeDialog" isSwitch>
        <ImageInput label="Brand Icon" id="welcome-dialog-image" tipsText="We recommend an image of at least 360x360 pixels. You can upload images in JPG, JPEG, or PNG format with a maximum size of 2MB." :showTips="true" />
        <TextArea v-model="firstDescription" label="First Description" />
        <TextArea v-model="secondDescription" label="Second Description" />
        <ImageInput label="Icon" id="welcome-dialog-icon" tipsText="We recommend an image of at least 360x360 pixels. You can upload images in JPG, JPEG, or PNG format with a maximum size of 2MB." :showTips="true" />
        <Input v-model="description" label="Description" />
        <InputCustom v-model="appearDelay" label="Appear Delay">
            <template #append-button>
                <div class="text-sm font-medium text-text-title">
                    Seconds
                </div>
            </template>
        </InputCustom>
        <Checkbox v-model="makeAutoExpand" label="Make Auto Expand" />
    </WidgetFormLayout>
    
    <WidgetFormLayout label="Attention Grabber" v-model="attentionGrabber" isSwitch>
        <OptionalInput label="Image" v-model="attentionGrabberImage">
            <DragDropInput label="Upload Image" accept="image/png,image/jpg" acceptText="PNG or JPG" :maxSize="31457280" :maxFiles="5"/> 
        </OptionalInput>
        <OptionalInput label="Text" v-model="attentionGrabberText">
            <TextArea v-model="attentionGrabberTextDescription" label="Text Description" />
        </OptionalInput>
    </WidgetFormLayout>
</template>

<script lang="ts" setup>
import Input from '@/components/form/Input.vue';
import TextArea from '@/components/form/TextArea.vue';
import WidgetFormLayout from '../form/WIdgetFormLayout.vue';
import { ref, computed } from 'vue';
import DragDropInput from '@/components/form/DragDropInput.vue';
import OptionalInput from '../form/OptionalInput.vue';
import ImageInput from '@/components/form/ImageInput.vue';
import InputCustom from '@/components/form/InputCustom.vue';
import Checkbox from '@/components/common/Checkbox.vue';

const welcomeDialogState = ref(true)
const attentionGrabberImage = ref(true)
const attentionGrabberText = ref(true)
const appearDelay = ref('')
const makeAutoExpand = ref(false)
const firstDescription = ref('')
const secondDescription = ref('')
const description = ref('')
const attentionGrabberTextDescription = ref('')

const welcomeDialog = computed({
    get: () => welcomeDialogState.value,
    set: (value: boolean) => {
        welcomeDialogState.value = value;
    }
});

const attentionGrabber = computed({
    get: () => !welcomeDialogState.value,
    set: (value: boolean) => {
        welcomeDialogState.value = !value;
    }
});
</script>
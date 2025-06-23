<template>
    <WidgetFormLayout label="Welcome Dialog" v-model="welcomeDialog" isSwitch>
        <TextArea label="First Description" />
        <Input label="Description" />
    </WidgetFormLayout>
    <WidgetFormLayout label="Attention Grabber" v-model="attentionGrabber" isSwitch>
        <OptionalInput label="Image" v-model="attentionGrabberImage">
            <DragDropInput label="Upload Image" accept="image/png,image/jpg" acceptText="PNG or JPG" maxSize="31457280" maxFiles="5"/> 
        </OptionalInput>
        <OptionalInput label="Text" v-model="attentionGrabberText">
            <TextArea label="Text Description" />
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

const welcomeDialogState = ref(true)
const attentionGrabberImage = ref(true)
const attentionGrabberText = ref(true)

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
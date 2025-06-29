<template>
    <div class="flex w-full items-start gap-8 self-stretch p-4">
        <div class="flex flex-col gap-8">
            <WidgetFormLayout label="Login Form">
                <template #additional-info>
                    <Banner intent="positive" type="solid">
                        Figma ipsum component variant main layer. Slice figjam select select pencil.
                        Share mask draft edit invite subtract rotate variant. Create subtract hand
                        auto
                        pen object. Community figjam flatten.
                    </Banner>
                </template>
                <template #inputs>
                    <ImageInput label="Brand Logo" id="login-form-logo">
                        <template #tips>
                            <div class="text-[#A0A0A0] text-sm font-normal">
                                We recommend an image of at least 360x360 pixels. You can upload
                                images
                                in JPG, JPEG, or
                                PNG format with a maximum size of 2MB.
                            </div>
                        </template>
                    </ImageInput>
                    <TextArea v-model="loginFormReact.firstDescription" label="First Description" />
                    <TextArea v-model="loginFormReact.secondDescription"
                        label="Second Description" />
                    <TextArea v-model="loginFormReact.subtitle" label="Subtitle" />
                    <Input label="Button Form" v-model="loginFormReact.buttonForm" />
                    <RadioInput v-model="loginFormReact.customerIdentifier" label="Phone Number"
                        :options="customerIdentifierOptions" />
                    <Banner intent="positive" type="solid">
                        If you use phone number to login, we won’t be able to send chat history and
                        notes to the
                        customer’s email after the room is resolved.
                    </Banner>
                </template>
            </WidgetFormLayout>

            <div
                class="flex p-6 justify-between items-center bg-gray-200 rounded-2xl border border-gray-300 w-full">
                <span class="text-text-title text-base font-semibold">Additional Field</span>
                <Button intent="flat" size="xsmall" type="button" @click="addAdditionalField">
                    <template #prefixIcon>
                        <PlusIcon class="w-4 h-4" />
                    </template>
                    <span>Add More Field</span>
                </Button>
            </div>
        </div>
    </div>

    <!-- Add Additional Field Modal -->
    <Modal :isOpen="isOpenModal" @close="isOpenModal = false" confirmText="Add Field">
        <template #title>
            Add Additional Field
        </template>
        <template #content>
            <div class="flex flex-col gap-2 mb-9">
                <Select label="Field Type" :options="fieldTypeOptions"
                    v-model="additionalField.type" />
                <div v-if="additionalField.type !== ''" class="flex flex-col gap-6">
                    <Input label="Title" v-model="additionalField.title" />
                    <Input label="Placeholder" v-model="additionalField.placeholder" />
                    <template v-if="additionalField.type === 'dropdown'">
                        <DropdownItemInput v-model="additionalField.dropdownItems" />
                    </template>
                    <div class="flex items-center my-2">
                        <Checkbox label="Set this field to required"
                            v-model="additionalField.required" />
                    </div>
                    <IconSelectInput v-model="additionalField.iconField" :icons="icons" />
                </div>
            </div>
        </template>
    </Modal>
</template>

<script setup lang="ts">
import Banner from '@/components/common/Banner.vue';
import Button from '@/components/common/Button.vue';
import { Checkbox } from '@/components/common/common';
import Modal from '@/components/common/Modal.vue';
import ImageInput from '@/components/form/ImageInput.vue';
import Input from '@/components/form/Input.vue';
import RadioInput from '@/components/form/RadioInput.vue';
import Select from '@/components/form/Select.vue';
import TextArea from '@/components/form/TextArea.vue';
import { PlusIcon } from '@/components/icons';
import { reactive, ref } from 'vue';
import DropdownItemInput from '../form/DropdownItemInput.vue';
import IconSelectInput from '../form/IconSelectInput.vue';
import WidgetFormLayout from '../form/WIdgetFormLayout.vue';

interface AdditionalField {
    type: string;
    title: string;
    placeholder: string;
    required: boolean;
    iconField: any;
    dropdownItems: string[];
    isRequired: boolean;
}

const loginFormReact = reactive({
    firstDescription: '',
    secondDescription: '',
    subtitle: '',
    buttonForm: '',
    customerIdentifier: '',
});

const additionalField = reactive<AdditionalField>({
    type: '',
    title: '',
    placeholder: '',
    required: false,
    iconField: '',
    dropdownItems: [],
    isRequired: false,
});


const isOpenModal = ref(false);

const customerIdentifierOptions = [
    {
        label: 'Email',
        value: 'email',
    },
    {
        label: 'Phone Number',
        value: 'phone',
    },
]

const fieldTypeOptions = [
    {
        text: 'Input Text',
        value: 'input',
    },
    {
        text: 'Text Area',
        value: 'textarea',
    },
    {
        text: 'Dropdown',
        value: 'dropdown',
    }
]

const icons = [
    {
        name: 'Date',
        icon: 'date',
    },
    {
        name: 'Location',
        icon: 'pin'
    },
    {
        name: 'Briefcase',
        icon: 'briefcase',
    },
    {
        name: 'Globe',
        icon: 'globe',
    },
    {
        name: 'Phone',
        icon: 'phone',
    },
]

const addAdditionalField = () => {
    isOpenModal.value = true;
}
</script>
<template>
  <div class="flex w-full items-start justify-between gap-8 self-stretch">
    <div class="flex flex-1 flex-col gap-8">
      <WidgetFormLayout label="Login Form">
        <template #additional-info>
          <Banner intent="positive" type="solid">
            Figma ipsum component variant main layer. Slice figjam select select pencil. Share mask
            draft edit invite subtract rotate variant. Create subtract hand auto pen object.
            Community figjam flatten.
          </Banner>
        </template>
        <template #inputs>
          <ImageInput label="Brand Logo" id="login-form-logo">
            <template #tips>
              <div class="text-sm font-normal text-[#A0A0A0]">
                We recommend an image of at least 360x360 pixels. You can upload images in JPG,
                JPEG, or PNG format with a maximum size of 2MB.
              </div>
            </template>
          </ImageInput>
          <TextArea v-model="qiscusLiveChatStore.firstDescriptionLoginForm" label="First Description" />
          <TextArea v-model="qiscusLiveChatStore.secondDescriptionLoginForm" label="Second Description" />
          <TextArea v-model="qiscusLiveChatStore.subtitleLoginForm" label="Subtitle" />
          <Input label="Button Form" v-model="qiscusLiveChatStore.buttonFormLoginForm" />
          <RadioInput
            v-model="qiscusLiveChatStore.customerIdentifierLoginForm"
            label="Phone Number"
            :options="qiscusLiveChatStore.customerIdentifierOptions"
          />
          <Banner intent="positive" type="solid">
            If you use phone number to login, we won't be able to send chat history and notes to the
            customer's email after the room is resolved.
          </Banner>
        </template>
      </WidgetFormLayout>

      <div class="flex flex-col gap-4 rounded-2xl border border-gray-300 bg-gray-200 p-6">
        <div class="flex w-full items-center justify-between">
          <span class="text-text-title text-base font-semibold">Additional Field</span>
          <Button intent="flat" size="small" type="button" @click="addAdditionalField">
            <template #prefixIcon>
              <PlusIcon class="h-4 w-4" />
            </template>
            <span>Add More Field</span>
          </Button>
        </div>
        <Divider v-if="qiscusLiveChatStore.additionalFieldLoginForm.length > 0" />
        <ul class="flex flex-col gap-6" v-if="qiscusLiveChatStore.additionalFieldLoginForm.length > 0">
          <li
            v-for="(field, index) in qiscusLiveChatStore.additionalFieldLoginForm"
            :key="field.title"
            class="flex items-center justify-between"
          >
            <span class="text-text-title text-sm font-medium">{{ field.title }}</span>
            <DropdownMenu :options="getFieldOptions(index)" @select="handleFieldMenuSelect" />
          </li>
        </ul>
      </div>
    </div>

    <!-- PREVIEW -->
    <div class="bg-white-100 sticky top-20 z-50 flex flex-1 flex-col items-end p-6">
      <LoginForm
        :title="qiscusLiveChatStore.firstDescriptionLoginForm"
        :subtitle="qiscusLiveChatStore.secondDescriptionLoginForm"
        :description="qiscusLiveChatStore.subtitleLoginForm"
        :buttonText="qiscusLiveChatStore.buttonFormLoginForm"
      />
    </div>
  </div>

  <!-- Add Additional Field Modal -->
  <Modal :isOpen="isOpenModal" @close="isOpenModal = false" confirmText="Add Field"
    @confirm="addAdditionalFieldConfirm">
    <template #title> Add Additional Field </template>
    <template #content>
      <div class="mb-9 flex flex-col gap-2">
        <Select label="Field Type" :options="qiscusLiveChatStore.fieldTypeOptionsAdditionalField" v-model="additionalField.type" />
        <div v-if="additionalField.type !== ''" class="flex flex-col gap-6">
          <Input label="Title" v-model="additionalField.title" />
          <Input label="Placeholder" v-model="additionalField.placeholder" />
          <template v-if="additionalField.type === 'dropdown'">
            <DropdownItemInput v-model="additionalField.dropdownItems" />
          </template>
          <div class="my-2 flex items-center">
            <Checkbox label="Set this field to required" v-model="additionalField.required" />
          </div>
          <IconSelectInput v-model="additionalField.iconField" :icons="qiscusLiveChatStore.iconsAdditionalField" />
        </div>
      </div>
    </template>
    <template #footer>
      <Button intent="secondary" size="small" @click="isOpenModal = false">Cancel</Button>
      <Button intent="primary" size="small" @click="addAdditionalFieldConfirm"> Add Field </Button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

import Banner from '@/components/common/Banner.vue';
import Button from '@/components/common/Button.vue';
import DropdownMenu from '@/components/common/DropdownMenu.vue';
import Modal from '@/components/common/Modal.vue';
import { Checkbox } from '@/components/common/common';
import ImageInput from '@/components/form/ImageInput.vue';
import Input from '@/components/form/Input.vue';
import RadioInput from '@/components/form/RadioInput.vue';
import Select from '@/components/form/Select.vue';
import TextArea from '@/components/form/TextArea.vue';
import { PlusIcon } from '@/components/icons';
import Divider from '@/components/ui/Divider.vue';
import LoginForm from '@/components/ui/widget-preview/LoginForm.vue';

import { useQiscusLiveChatStore } from '@/stores/integration/qiscus-live-chat';
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

const qiscusLiveChatStore = useQiscusLiveChatStore();

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

>>>>>>> ca2936747b7990e544ea36693fe5389a72e9b56b
const addAdditionalField = () => {
  isOpenModal.value = true;
};

const resetAdditionalField = () => {
  additionalField.type = '';
  additionalField.title = '';
  additionalField.placeholder = '';
  additionalField.required = false;
  additionalField.iconField = '';
  additionalField.dropdownItems = [];
  additionalField.isRequired = false;
};

const addAdditionalFieldConfirm = () => {
  qiscusLiveChatStore.additionalFieldLoginForm.push({ ...additionalField });
  resetAdditionalField();
  isOpenModal.value = false;
};

const getFieldOptions = (index: number) => {
  const field = qiscusLiveChatStore.additionalFieldLoginForm[index];
  if (!field) return [];

  return [
    {
      label: 'Edit Field',
      value: 'edit',
      action: () => editField(field),
    },
    {
      label: 'Delete Field',
      value: 'delete',
      class: 'text-red-600',
      action: () => deleteField(index),
    },
  ];
};

const editField = (field: AdditionalField) => {
  isOpenModal.value = true;
  additionalField.type = field.type;
  additionalField.title = field.title;
  additionalField.placeholder = field.placeholder;
  additionalField.required = field.required;
  additionalField.iconField = field.iconField;
  additionalField.dropdownItems = [...field.dropdownItems];
  additionalField.isRequired = field.isRequired;
};

const deleteField = (index: number) => {
  qiscusLiveChatStore.additionalFieldLoginForm.splice(index, 1);
};

const handleFieldMenuSelect = (option: any) => {
  // Actions are handled in the option.action function
  console.log('Selected:', option);
};
</script>

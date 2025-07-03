<template>
  <div class="flex w-full items-start justify-between gap-8 self-stretch">
    <div class="flex flex-1 flex-col gap-8">
      <WidgetFormLayout label="Login Form">
        <template #additional-info>
          <Banner intent="positive" type="outline">
            Figma ipsum component variant main layer. Slice figjam select select pencil. Share mask
            draft edit invite subtract rotate variant. Create subtract hand auto pen object.
            Community figjam flatten.
          </Banner>
        </template>
        <template #inputs>
          <ImageInput label="Brand Logo" id="login-form-logo" :isUploading="loading" @upload="uploadImage">
            <template #tips>
              <div class="text-sm font-normal text-[#A0A0A0]">
                We recommend an image of at least 360x360 pixels. You can upload images in JPG,
                JPEG, or PNG format with a maximum size of 2MB.
              </div>
            </template>
          </ImageInput>
          <TextArea
            v-model="loginFormState.firstDescription"
            label="First Description"
            :maxlength="50"
          />
          <TextArea
            v-model="loginFormState.secondDescription"
            label="Second Description"
            :maxlength="50"
          />
          <TextArea v-model="loginFormState.formSubtitle" label="Subtitle" :maxlength="50" />
          <Input label="Button Form" v-model="loginFormState.buttonText" :maxlength="50" />
          <RadioInput
            v-model="loginFormState.customerIdentifier"
            label="Phone Number"
            :options="qiscusLiveChatStore.customerIdentifierOptions"
          />
          <Banner intent="positive" type="outline">
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
        <Divider v-if="loginFormState.extraFields?.length > 0 && loginFormState.extraFields" />
        <ul
          class="flex flex-col gap-6"
          v-if="loginFormState.extraFields?.length > 0 && loginFormState.extraFields"
        >
          <li
            v-for="(field, index) in loginFormState.extraFields"
            :key="field.name"
            class="flex items-center justify-between"
          >
            <span class="text-text-title text-sm font-medium">{{ field.name }}</span>
            <DropdownMenu :options="getFieldOptions(index)" @select="handleFieldMenuSelect" />
          </li>
        </ul>
      </div>
    </div>

    <!-- PREVIEW -->
    <div class="bg-white-100 sticky top-20 z-50 flex flex-1 flex-col items-end p-6">
      <LoginForm
        :title="loginFormState.firstDescription"
        :subtitle="loginFormState.secondDescription"
        :description="loginFormState.formSubtitle"
        :buttonText="loginFormState.buttonText"
      />
    </div>
  </div>

  <!-- Add Additional Field Modal -->
  <Modal
    :isOpen="isOpenModal"
    @close="isOpenModal = false"
    confirmText="Add Field"
    @confirm="addAdditionalFieldConfirm"
  >
    <template #title> Add Additional Field </template>
    <template #content>
      <div class="mb-9 flex flex-col gap-2">
        <Select
          label="Field Type"
          :options="qiscusLiveChatStore.fieldTypeOptionsAdditionalField"
          v-model="additionalField.type"
        />
        <div v-if="additionalField.type !== ''" class="flex flex-col gap-6">
          <Input label="Name" v-model="additionalField.name" />
          <Input label="Placeholder" v-model="additionalField.placeholder" />
          <template v-if="additionalField.type === 'dropdown' && additionalField.options">
            <DropdownItemInput v-model="additionalField.options" />
          </template>
          <div class="my-2 flex items-center">
            <Checkbox label="Set this field to required" v-model="additionalField.required" />
          </div>
          <IconSelectInput
            v-model="additionalField.iconField"
            :icons="qiscusLiveChatStore.iconsAdditionalField"
          />
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
import { storeToRefs } from 'pinia';
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

import { useUploadSdkImage } from '@/composables/images/useUploadSdkImage';
import DropdownItemInput from '../form/DropdownItemInput.vue';
import IconSelectInput from '../form/IconSelectInput.vue';
import WidgetFormLayout from '../form/WIdgetFormLayout.vue';

interface AdditionalField {
  type: string;
  name: string;
  placeholder: string;
  required: boolean;
  iconField?: string;
  options?: string[];
}

const qiscusLiveChatStore = useQiscusLiveChatStore();
const { loginFormState } = storeToRefs(useQiscusLiveChatStore());
const {loading, data, error, upload} = useUploadSdkImage()

const additionalField = reactive<AdditionalField>({
  type: '',
  name: '',
  placeholder: '',
  required: false,
  iconField: undefined,
  options: [],
});

const isOpenModal = ref(false);

const addAdditionalField = () => {
  isOpenModal.value = true;
};

const resetAdditionalField = () => {
  additionalField.type = '';
  additionalField.name = '';
  additionalField.placeholder = '';
  additionalField.required = false;
  additionalField.iconField = '';
  additionalField.options = [];
};

const addAdditionalFieldConfirm = () => {
  loginFormState.value.extraFields.push({ ...additionalField });
  resetAdditionalField();
  isOpenModal.value = false;
};

const getFieldOptions = (index: number) => {
  const field = loginFormState.value.extraFields[index];
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
  additionalField.name = field.name;
  additionalField.placeholder = field.placeholder;
  additionalField.required = field.required;
  additionalField.iconField = field.iconField;
  additionalField.options = field.options ? [...field.options] : [];
};

const deleteField = (index: number) => {
  loginFormState.value.extraFields.splice(index, 1);
};

const handleFieldMenuSelect = (option: any) => {
  // Actions are handled in the option.action function
  console.log('Selected:', option);
};

const uploadImage = async (file: File) => {
  await upload(file);
  if(data.value) {
    loginFormState.value.brandLogo = data.value.url;
  } else {
    console.error(error.value);
  }
};
</script>

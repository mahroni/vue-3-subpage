<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, reactive, ref, watch } from 'vue';

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
import { useUploadSdkImage } from '@/composables/images/useUploadSdkImage';
import WidgetFormLayout from '@/features/widget-builder/components/layout/WidgetFormLayout.vue';
import { useQiscusLiveChatStore } from '@/stores/integration/qiscus-live-chat';

import DropdownItemInput from './components/form/DropdownItemInput.vue';
import IconSelectInput from './components/form/IconSelectInput.vue';

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
const { loading, data, error, upload } = useUploadSdkImage();

const additionalField = reactive<AdditionalField>({
  type: '',
  name: '',
  placeholder: '',
  required: false,
  iconField: 'Date',
  options: [],
});

const isOpenModal = ref(false);

// Form validation for additional field
const isAdditionalFieldValid = computed(() => {
  if (!additionalField.type) return false;
  if (!additionalField.name.trim()) return false;
  if (!additionalField.placeholder.trim()) return false;

  // If type dropdown, make sure there is at least 1 option
  if (additionalField.type === 'dropdown') {
    return additionalField.options && additionalField.options.length > 0;
  }

  return true;
});

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
  if (data.value) {
    loginFormState.value.brandLogo = data.value.url;
  } else {
    console.error(error.value);
  }
};

watch(
  () => additionalField.iconField,
  (newIcon, oldIcon) => {
    if (newIcon !== oldIcon) {
      console.log('User selected icon:', newIcon);
      // console.log('Previous icon:', oldIcon);
    }
  }
);
</script>

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
          <ImageInput
            label="Brand Icon"
            id="login-form-icon"
            :isUploading="loading"
            @upload="uploadImage"
          >
            <template #tips>
              <div class="text-sm font-normal text-[#A0A0A0]">
                We recommend an image of at least 360x360 pixels. You can upload images in JPG,
                JPEG, or PNG format with a maximum size of 2MB.
              </div>
            </template>
          </ImageInput>
          <TextArea
            id="first-desc-login"
            v-model="loginFormState.firstDescription"
            label="First Descriptions"
            :maxlength="50"
          />
          <TextArea
            id="second-desc-login"
            v-model="loginFormState.secondDescription"
            label="Second Descriptions"
            :maxlength="50"
          />
          <TextArea
            id="subtitle-login"
            v-model="loginFormState.formSubtitle"
            label="Subtitle"
            :maxlength="50"
          />
          <Input
            id="button-form-login"
            label="Button Form"
            v-model="loginFormState.buttonText"
            :maxlength="50"
          />
          <RadioInput
            id="phone-number-login"
            v-model="loginFormState.customerIdentifier"
            label="Choose Customer Identifier"
            :options="qiscusLiveChatStore.customerIdentifierOptions"
          />
          <Banner
            v-if="loginFormState.customerIdentifier === 'phone'"
            intent="positive"
            type="outline"
          >
            If you use phone number to login, we won't be able to send chat history and notes to the
            customer's email after the room is resolved.
          </Banner>
        </template>
      </WidgetFormLayout>

      <div class="flex flex-col gap-4 rounded-2xl border border-gray-300 bg-gray-200 p-6">
        <div class="flex w-full items-center justify-between">
          <span class="text-text-title text-base font-semibold">Additional Field</span>
          <Button
            id="add-more-field"
            intent="flat"
            type="button"
            class="!px-0"
            disableAnimation
            @click="addAdditionalField"
          >
            <template #prefixIcon>
              <PlusIcon class="h-4 w-4" />
            </template>
            <span class="text-xs font-semibold">Add More Field</span>
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
    <div class="bg-white-100 sticky top-20 z-50 flex flex-1 flex-col items-end gap-4 p-6">
      <LoginForm
        :title="loginFormState.firstDescription"
        :subtitle="loginFormState.secondDescription"
        :description="loginFormState.formSubtitle"
        :buttonText="loginFormState.buttonText"
        :fields="
          loginFormState.extraFields.map((field) => ({
            id: field.name,
            icon: field.iconField || '',
            type: field.type === 'dropdown' ? 'select' : field.type,
            label: field.name,
            placeholder: field.placeholder,
          }))
        "
      />
      <div class="bg-surface-disable h-16 w-16 rounded-full" />
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
          id="field-type"
          label="Field Type"
          :options="qiscusLiveChatStore.fieldTypeOptionsAdditionalField"
          v-model="additionalField.type"
        />
        <div v-if="additionalField.type !== ''" class="flex flex-col gap-6">
          <Input
            id="name-field"
            label="Title"
            placeholder="e,g: Address, Number Phone"
            v-model="additionalField.name"
          />
          <Input
            id="placeholder-field"
            label="Placeholder"
            placeholder="e,g: Type your address here"
            v-model="additionalField.placeholder"
          />
          <template v-if="additionalField.type === 'dropdown' && additionalField.options">
            <DropdownItemInput v-model="additionalField.options" />
          </template>
          <div class="my-2 flex items-center">
            <Checkbox
              id="required-field"
              label="Set this field to required"
              v-model="additionalField.required"
            />
          </div>
          <IconSelectInput
            id="icon-field"
            v-model="additionalField.iconField"
            :icons="qiscusLiveChatStore.iconsAdditionalField"
          />
        </div>
      </div>
    </template>
    <template #footer>
      <Button id="cancel-field" intent="secondary" size="small" @click="isOpenModal = false"
        >Cancel</Button
      >
      <Button
        :disabled="!isAdditionalFieldValid"
        id="add-field"
        intent="primary"
        size="small"
        @click="addAdditionalFieldConfirm"
      >
        Add Field
      </Button>
    </template>
  </Modal>
</template>

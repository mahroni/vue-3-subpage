<script setup lang="ts">
import { MoreIcon } from '@/components/icons';
import { onMounted, onUnmounted, ref } from 'vue';

interface DropdownOption {
    label: string;
    value: string;
    icon?: string;
    class?: string;
    action?: () => void;
}

interface Props {
    options: DropdownOption[];
    iconSize?: number;
    position?: 'left' | 'right';
}

const props = withDefaults(defineProps<Props>(), {
    iconSize: 24,
    position: 'right',
});

const emit = defineEmits<{
    (e: 'select', option: DropdownOption): void;
}>();

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement>();

const toggleDropdown = (event: Event) => {
    event.stopPropagation();
    isOpen.value = !isOpen.value;
};

const selectOption = (option: DropdownOption) => {
    if (option.action) {
        option.action();
    }
    emit('select', option);
    isOpen.value = false;
};

const closeDropdown = () => {
    isOpen.value = false;
};

const handleClickOutside = (event: Event) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
        closeDropdown();
    }
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});

const positionClasses = {
    left: 'left-8',
    right: 'right-8',
};
</script>

<template>
    <div class="relative" ref="dropdownRef">
        <!-- Kebab Icon Trigger -->
        <button @click="toggleDropdown"
            class="p-1 rounded-md hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            type="button">
            <MoreIcon :size="props.iconSize" class="text-gray-600" />
        </button>

        <!-- Dropdown Menu -->
        <Transition enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95">
            <div v-if="isOpen" :class="[
                'absolute top-0 z-50 bg-white border border-gray-300 rounded-lg shadow-lg py-1 min-w-40',
                positionClasses[props.position]
            ]" @click.stop>
                <button v-for="option in props.options" :key="option.value"
                    @click="selectOption(option)" :class="[
                        'block w-full text-left px-6 py-5 text-sm hover:bg-gray-200 transition-colors duration-150 cursor-pointer',
                        option.class || 'text-gray-700'
                    ]">
                    <div class="flex items-center gap-2">
                        <component v-if="option.icon" :is="option.icon" class="w-4 h-4" />
                        <span class="whitespace-nowrap">{{ option.label }}</span>
                    </div>
                </button>
            </div>
        </Transition>
    </div>
</template>

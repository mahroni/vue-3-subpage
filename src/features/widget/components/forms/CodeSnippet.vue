<script setup lang="ts">
import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import { computed, ref } from 'vue';

// Define an interface for the component's props
interface ICodeHighlightProps {
  code: string;
  language?: string; // Make it optional since it has a default value
  showLineNumbers?: boolean; // Make it optional as it has a default value
}

const props = withDefaults(defineProps<ICodeHighlightProps>(), {
  language: 'markup', // Provide the default value here
  showLineNumbers: false, // Provide the default value here
});

const copyButtonText = ref<string>('Copy Code');

const languageClass = computed<string>(() => `language-${props.language}`);

const highlightedCode = computed<string>(() => {
  // Ensure the language grammar is loaded before attempting to highlight
  if (Prism.languages[props.language]) {
    return Prism.highlight(props.code, Prism.languages[props.language]!, props.language);
  } else {
    // Fallback to 'markup' if the specified language grammar is not found
    console.warn(
      `Prism grammar for language "${props.language}" not loaded. Falling back to 'markup'.`
    );
    return Prism.highlight(props.code, Prism.languages.markup!, 'markup');
  }
});

/**
 * Copies the code snippet to the clipboard.
 */
const copyCode = async (): Promise<void> => {
  try {
    await navigator.clipboard.writeText(props.code);
    copyButtonText.value = 'Copied!';
    setTimeout(() => {
      copyButtonText.value = 'Copy Code';
    }, 2000);
  } catch (err) {
    console.error('Failed to copy code: ', err);
    copyButtonText.value = 'Failed';
  }
};
</script>

<template>
  <div class="group relative">
    <button
      type="button"
      @click="copyCode"
      class="absolute top-3 right-3 cursor-pointer rounded-md bg-gray-700 px-3 py-1.5 font-sans text-sm text-white opacity-0 transition-opacity duration-300 group-hover:z-10 group-hover:opacity-100"
    >
      {{ copyButtonText }}
    </button>

    <pre :class="['rounded-xl', '!p-3', '!m-0', { 'line-numbers': showLineNumbers }]">
      <code class="pl-10" :class="languageClass" v-html="highlightedCode"></code>
    </pre>
  </div>
</template>

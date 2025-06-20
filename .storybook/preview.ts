import type { Preview } from '@storybook/vue3-vite'
import '../src/assets/css/tailwind.css' // Import Tailwind CSS with custom theme

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;
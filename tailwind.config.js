/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // Standard HTML entry point (if you have one in root)
    "./public/index.html", // Vue CLI's default index.html location
    "./src/**/*.{vue,js,ts,jsx,tsx}", // Crucial: Scans all Vue, JS, TS files in 'src'
  ],
  theme: {
    extend: {
      colors: {
        // Green Color Scale (dari Atomic)
        green: {
          200: "#D1ECE5", // Green-200
          300: "#A1D9CB", // Green-300
          400: "#8EC5B2", // Green-400
          500: "#27B199", // Green-500 (Primary)
          600: "#288372", // Green-600
          700: "#24584E", // Green-700
          800: "#1B312C", // Green-800
        },

        // Navy Color Scale (dari Atomic)
        navy: {
          200: "#C4CBD9", // Navy-200
          300: "#8A9AB3", // Navy-300
          400: "#506C8F", // Navy-400
          500: "#01416C", // Navy-500 (Primary Blue)
          600: "#103352", // Navy-600
          700: "#14263A", // Navy-700
          800: "#121923", // Navy-800
        },

        // Black/Gray Scale (dari Atomic)
        black: {
          600: "#8F8F8F", // Black-600
          700: "#0A0A0A", // Black-700
          800: "#565656", // Black-800
          900: "#0A0A0A", // Black-900
          "900-60": "#0A0A0A", // Black-900-60 (dengan opacity)
        },

        // Gray/White Scale (dari Atomic)
        gray: {
          100: "#FFFFFF", // White-100
          200: "#FAFAFA", // White-200
          300: "#ECECEC", // White-300
          400: "#DFDFDF", // White-400
        },

        white: {
          100: "#FFFFFF", // White-100
          200: "#FAFAFA", // White-200
          300: "#ECECEC", // White-300
          400: "#DFDFDF", // White-400
        },

        // Status Colors - Positive (dari Atomic)
        positive: {
          100: "#F1F9EF", // Status/Positive/100
          200: "#C9E7BF", // Status/Positive/200
          300: "#A0D491", // Status/Positive/300
          400: "#288C7A", // Status/Positive/400
        },

        // Status Colors - Progressive (dari Atomic)
        progressive: {
          100: "#EEFAFE", // Status/Progressive/100
          200: "#C3E8FA", // Status/Progressive/200
          300: "#94D8F6", // Status/Progressive/300
          400: "#56CCF2", // Status/Progressive/400
        },

        // Status Colors - Cautions (dari Atomic)
        cautions: {
          100: "#FFF2D1", // Status/Cautions/100
          200: "#FFDDA0", // Status/Cautions/200
          300: "#FFC86F", // Status/Cautions/300
          400: "#D78E08", // Status/Cautions/400
        },

        // Status Colors - Negative (dari Atomic)
        negative: {
          100: "#FFD7D2", // Status/Negative/100
          200: "#FEAEA7", // Status/Negative/200
          300: "#F7857E", // Status/Negative/300
          400: "#EB5757", // Status/Negative/400
        },

        // Notification Colors (dari Atomic)
        error: {
          100: "#FFD7D2", // Notif/Error/100
          400: "#EF4C00", // Notif/Error/400
          800: "#9D380F", // Notif/Error/800
        },

        warning: {
          100: "#FFF2D1", // Notif/Warning/100
          400: "#D78E08", // Notif/Warning/400
          800: "#A0772A", // Notif/Warning/800
        },

        link: {
          100: "#EEFAFE", // Notif/Link/100
          400: "#007BFF", // Notif/Link/400
          800: "#2553A5", // Notif/Link/800
        },

        // Surface Colors (dari Token)
        surface: {
          "primary-green": "#27B199", // Primary Green
          "primary-blue": "#01416C", // Primary Blue
          "primary-white": "#FFFFFF", // Primary White
          secondary: "#FAFAFA", // Secondary
          disable: "#ECECEC", // Disable
          popup: "#0A0A0A", // Pop Up (Black-900-60)
          highlight: "#D1ECE5", // Highlight (Green-200)
        },

        // Text Colors (dari Token)
        text: {
          primary: "#27B199", // Primary (Green-500)
          secondary: "#FFFFFF", // Secondary (White-100)
          title: "#0A0A0A", // Title (Black-900)
          subtitle: "#565656", // Subtitle (Black-800)
          disable: "#8F8F8F", // Disable (Black-700)
          placeholder: "#8F8F8F", // Placeholder (Black-700)
        },

        // Soft Colors (dari Token)
        soft: {
          green: "#F1F9EF", // Status/Positive/100
          blue: "#EEFAFE", // Status/Progressive/100
          orange: "#FFF2D1", // Status/Cautions/100
          red: "#FFD7D2", // Status/Negative/100
        },

        // Button Colors (dari Token)
        button: {
          primary: "#27B199", // Green-500
          "hover-primary": "#288372", // Green-600
        },

        // Stroke Colors (dari Token)
        stroke: {
          bold: "#8F8F8F", // Black-600
          regular: "#ECECEC", // White-300
        },

        // Icon Colors (dari Token)
        icon: {
          black: "#0A0A0A", // Black-900
          white: "#FFFFFF", // White-100
          green: "#27B199", // Green-500
          disable: "#8F8F8F", // Black-700
        },

        // Notification Specific Colors (dari Token)
        notification: {
          error: "#EB5757", // Status/Negative/400
          link: "#007BFF", // Notif/Link/400
          warning: "#D78E08", // Notif/Warning/400
          dots: "#EB5757", // Status/Negative/400
        },

        // Label Colors (dari Token)
        label: {
          positive: "#288C7A", // Status/Positive/400
          progress: "#56CCF2", // Status/Progressive/400
          warning: "#D78E08", // Status/Cautions/400
          negative: "#EB5757", // Status/Negative/400
        },

        // Semantic shortcuts untuk kemudahan
        primary: {
          DEFAULT: "#27B199",
          hover: "#288372",
        },

        secondary: {
          DEFAULT: "#FAFAFA",
        },

        success: {
          DEFAULT: "#288C7A",
          light: "#F1F9EF",
        },

        info: {
          DEFAULT: "#56CCF2",
          light: "#EEFAFE",
        },

        warning: {
          DEFAULT: "#D78E08",
          light: "#FFF2D1",
        },

        danger: {
          DEFAULT: "#EB5757",
          light: "#FFD7D2",
        },
      },
    },
  },
  plugins: [],
};

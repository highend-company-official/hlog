/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/entities/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
    "./src/pages/**/*.{ts,tsx}",
    "./src/shared/**/*.{ts,tsx}",
    "./src/widgets/**/*.{ts,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        subMain: "#4e5968",
        title: "#09090b",
        subTitle: "#18181b",
        white: "#ffffff",
        error: "#ef4444",
        success: "#22c55e",
        black: "#334155",
      },
      keyframes: {
        "progress-bar": {
          "0%": { transform: "scaleX(1)" },
          "100%": { transform: "scaleX(0);" },
        },
      },
    },
  },
};

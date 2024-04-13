/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        subMain: "#3b82f6",
        title: "#09090b",
        subTitle: "#18181b",
        white: "#eff6ff",
        error: "#ef4444",
        success: "#22c55e",
      },
    },
  },
};

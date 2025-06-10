/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          200: "#c4c4cc",
          900: "#121214",
        },
        green: {
          500: "#015f43",
        },
      },
      backgroundModal: {
        "modal-bg": "rgba(0, 0, 0, 0.8)",
      },
      backgroundColor: {
        'blue-gradient': 'linear-gradient(to bottom, #2271E8 0%, #134082 100%)',
      },
    },
  },
  plugins: [],
};

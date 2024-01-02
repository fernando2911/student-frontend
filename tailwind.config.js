module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'check-success': '#DCFCE7'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};

module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
    './navigation/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    // Include the shadowColor utility
    preflight: false,
  },
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.shadow-gray': {
          shadowColor: 'rgb(107 114 128 / var(--tw-bg-opacity))', // Change this to your desired gray shade
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};

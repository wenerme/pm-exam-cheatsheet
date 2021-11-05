module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  mode: 'jit',
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        print: { raw: 'print' },
      },
      spacing: {
        a4w: '210mm',
        a4h: '296mm',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

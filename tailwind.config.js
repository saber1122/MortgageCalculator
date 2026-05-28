/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  important: '#root',
  theme: {
    extend: {
      colors: {
        finance: {
          navy: '#0a1628',
          blue: '#1a2744',
          'blue-light': '#243b5e',
          gold: '#d4a853',
          'gold-light': '#e8c97a',
          accent: '#2d5a8e',
        },
      },
      fontFamily: {
        sans: ['"PingFang SC"', '"Microsoft YaHei"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};

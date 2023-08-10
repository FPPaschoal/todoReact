/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        rotate: {
          to: {
            background: '#FF0000',
            transform: 'rotate3d(1, 1, 1, 1440deg)',
          },
        },
      },
      animation: {
        rotate: 'rotate 2000ms ease infinite',
      },
    },
  },
  plugins: [],
}

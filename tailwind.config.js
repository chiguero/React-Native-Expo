/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        MontserratMedium: ['Montserrat-Medium', 'sans-serif'],
        MontserratBold: ['Montserrat-Bold', 'sans-serif'],
        MontserratLight: ['Montserrat-Light', 'sans-serif'],
        MontserratRegular: ['Montserrat-Regular', 'sans-serif'],
        MontserratSemiBold: ['Montserrat-SemiBold', 'sans-serif'],
      },
      colors: {
        nexus: {
          50: '#f8fafc',
          100: '#f1f5f9',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
    },
  },
  plugins: [],
}
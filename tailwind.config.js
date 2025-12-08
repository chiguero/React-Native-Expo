/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
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
    },
  },
  plugins: [],
}


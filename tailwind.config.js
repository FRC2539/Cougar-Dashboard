module.exports = {
  purge: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: false,
  theme: {
    rotate: {
      '-180': '-180deg',
      '-90': '-90deg',
      '-45': '-45deg',
      '0': '0',
      '45': '45deg',
      '90': '90deg',
      '135': '135deg',
      '180': '180deg',
      '270': '270deg',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      gray: {
        DEFAULT: '#272727'
      },
      white: {
        DEFAULT: '#FFFFFF'
      },
      black: {
        DEFAULT: '#000000'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

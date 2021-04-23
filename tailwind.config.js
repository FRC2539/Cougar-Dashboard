const { fontFamily } = require('tailwindcss/defaultTheme')

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
      },
      orange: {
        DEFAULT: '#EA8427',
        dark: '#BA5900'
      },
      red: {
        DEFAULT: '#FF0000'
      },
      green: {
        DEFAULT: '#61FF00'
      }
    },
    extend: {
      gridTemplateRows: {
       '7': 'repeat(7, minmax(0, 1fr))'
      },
      backgroundImage: {
        'team-logo': "url('./assets/2539-logo.png')",
      },
      fontFamily: {
        'main': ['IBM Plex Sans']
      },
      maxHeight: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%'
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

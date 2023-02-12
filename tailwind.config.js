const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: false,
  theme: {
    fontSize: {
      'svg-xxs': '.30rem',
      'svg-xs': '.40rem',
      'svg-s': '.43rem',
      'xs': '.75rem',
      'sm': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
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
      },
      purple: {
        DEFAULT: '#aa24f2'
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

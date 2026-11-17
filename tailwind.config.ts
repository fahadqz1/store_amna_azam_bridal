import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Premium AMNA AZAM palette
        cream: {
          50: '#FFFEF9',
          100: '#FFFBF0',
          200: '#FFF5E0',
          300: '#FFEFD0',
          400: '#FFE8C0',
          500: '#FFE0B0',
          600: '#FFD99F',
          700: '#FFD48F',
          800: '#FFCE7F',
          900: '#FFC86F',
        },
        ivory: {
          50: '#FEFDFB',
          100: '#FFFCF7',
          200: '#FFF9F0',
          300: '#FFF5E8',
          400: '#FFF1E0',
          500: '#FFEDD8',
          600: '#FFE9CF',
          700: '#FFE4C7',
          800: '#FFDEBF',
          900: '#FFD8B7',
        },
        champagne: {
          50: '#FFFEF9',
          100: '#FEF9F2',
          200: '#FEF3EA',
          300: '#FDEDE2',
          400: '#FDE8DA',
          500: '#FCE2D2',
          600: '#FBDCC9',
          700: '#FAD6C1',
          800: '#F9D0B8',
          900: '#F7CAB0',
        },
        wheat: '#F5DEB3',
        gold: {
          50: '#FFFEF9',
          100: '#FFFCF1',
          200: '#FFFAE5',
          300: '#FFF7D9',
          400: '#FFF4CD',
          500: '#FFF1C1',
          600: '#FFEAB5',
          700: '#FFE2A9',
          800: '#FFDB9D',
          900: '#FFD391',
        },
        charcoal: '#2B2B2B',
        slate: '#3F3F3F',
      },
      fontSize: {
        xs: ['12px', { lineHeight: '16px' }],
        sm: ['14px', { lineHeight: '20px' }],
        base: ['16px', { lineHeight: '24px' }],
        lg: ['18px', { lineHeight: '28px' }],
        xl: ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '36px' }],
        '4xl': ['36px', { lineHeight: '40px' }],
        '5xl': ['48px', { lineHeight: '54px' }],
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-40px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(40px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config

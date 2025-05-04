/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        primary: {
          50: 'rgb(240 253 244)',
          100: 'rgb(220 252 231)',
          200: 'rgb(187 247 208)',
          300: 'rgb(134 239 172)',
          400: 'rgb(74 222 128)',
          500: 'rgb(34 197 94)',
          600: 'rgb(22 163 74)',
          700: 'rgb(21 128 61)',
          800: 'rgb(22 101 52)',
          900: 'rgb(20 83 45)',
          950: 'rgb(5 46 22)',
        },
        
        // Role-specific colors
        admin: {
          50: 'rgb(250 245 255)',
          100: 'rgb(243 232 255)',
          200: 'rgb(233 213 255)',
          300: 'rgb(216 180 254)',
          400: 'rgb(192 132 252)',
          500: 'rgb(168 85 247)',
          600: 'rgb(147 51 234)',
          700: 'rgb(126 34 206)',
          800: 'rgb(107 33 168)',
          900: 'rgb(88 28 135)',
          950: 'rgb(59 7 100)',
        },
        organizer: {
          50: 'rgb(239 246 255)',
          100: 'rgb(219 234 254)',
          200: 'rgb(191 219 254)',
          300: 'rgb(147 197 253)',
          400: 'rgb(96 165 250)',
          500: 'rgb(59 130 246)',
          600: 'rgb(37 99 235)',
          700: 'rgb(29 78 216)',
          800: 'rgb(30 64 175)',
          900: 'rgb(30 58 138)',
          950: 'rgb(23 37 84)',
        },
        archer: {
          // Same as primary (green)
          50: 'rgb(240 253 244)',
          100: 'rgb(220 252 231)',
          200: 'rgb(187 247 208)',
          300: 'rgb(134 239 172)',
          400: 'rgb(74 222 128)',
          500: 'rgb(34 197 94)',
          600: 'rgb(22 163 74)',
          700: 'rgb(21 128 61)',
          800: 'rgb(22 101 52)',
          900: 'rgb(20 83 45)',
          950: 'rgb(5 46 22)',
        },
      },
      boxShadow: {
        card: '0 2px 5px -1px rgba(0, 0, 0, 0.05), 0 1px 3px -1px rgba(0, 0, 0, 0.05)',
        dropdown: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-in-out',
        'scale-in': 'scaleIn 0.2s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
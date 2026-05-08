/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy:         '#1B2F5E',
          'navy-dark':  '#111E3E',
          'navy-light': '#2A4580',
          blue:         '#4A90C4',
          'blue-light': '#7AB3D8',
          cream:        '#F7F4EF',
          gold:         '#C8A84B',
          'gold-light': '#E0C97A',
          charcoal:     '#2C2C2C',
          muted:        '#6B7280',
          border:       '#E5E1D8',
        },
      },
      fontFamily: {
        display:    ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:       ['Lato', 'Helvetica Neue', 'sans-serif'],
        scripture:  ['EB Garamond', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-xl': ['4rem',    { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'display-lg': ['3rem',    { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-md': ['2.25rem', { lineHeight: '1.2',  letterSpacing: '-0.01em' }],
        'display-sm': ['1.75rem', { lineHeight: '1.25' }],
      },
      borderRadius: {
        brand:      '0.5rem',
        'brand-lg': '1rem',
      },
      boxShadow: {
        'brand-sm': '0 2px 12px rgba(27, 47, 94, 0.08)',
        'brand':    '0 4px 24px rgba(27, 47, 94, 0.12)',
        'brand-lg': '0 8px 48px rgba(27, 47, 94, 0.18)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #1B2F5E 0%, #2A4580 50%, #1B2F5E 100%)',
        'blue-gradient':  'linear-gradient(135deg, #4A90C4 0%, #7AB3D8 100%)',
      },
      animation: {
        'fade-in':    'fadeIn 0.6s ease-out forwards',
        'slide-up':   'slideUp 0.6s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn:    { '0%': { opacity: '0' },                                       '100%': { opacity: '1' } },
        slideUp:   { '0%': { opacity: '0', transform: 'translateY(20px)' },        '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideDown: { '0%': { opacity: '0', transform: 'translateY(-10px)' },       '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}

module.exports = config

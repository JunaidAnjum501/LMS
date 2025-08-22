/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',    // Royal Blue
        secondary: '#06B6D4',  // Bright Cyan
        accent: '#F97316',     // Orange
        background: '#FFFFFF', // White
        'light-gray': '#F9FAFB',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        heading: ['var(--font-poppins)'],
        body: ['var(--font-roboto)'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
      },
      boxShadow: {
        'custom': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}
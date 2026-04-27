/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        henna: {
          50:  '#fbf4ee',
          100: '#f4e3d2',
          200: '#e7c29e',
          300: '#d39b6a',
          400: '#b87441',
          500: '#8b4513',
          600: '#6f3610',
          700: '#55280b',
          800: '#3d1c08',
          900: '#261104',
        },
        cream: '#fdf8f3',
        ink:   '#1a120b',
      },
      fontFamily: {
        display: ['"Playfair Display Variable"', '"Playfair Display"', '"Playfair Fallback"', 'Georgia', 'serif'],
        sans: ['"Inter Variable"', 'Inter', '"Inter Fallback"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'paisley': "radial-gradient(ellipse at top, rgba(139,69,19,0.08), transparent 60%), radial-gradient(ellipse at bottom right, rgba(211,155,106,0.10), transparent 60%)",
      },
    },
  },
  plugins: [],
};

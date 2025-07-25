// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // all React components
  ],
  theme: {
    extend: {
      fontFamily: {
        'luckiest': ['"Luckiest Guy"', 'cursive'],
        'noto-devanagari': ['"Noto Sans Devanagari"', 'sans-serif'],
        'open-sans': ['"Open Sans"', 'sans-serif'],
        'winky': ['"Winky Rough"', 'cursive'],
         'guy': ['"Luckiest Guy"', 'cursive'],
        },
    },
  },
  plugins: [],
}

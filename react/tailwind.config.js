/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Inclut tous les fichiers React dans src
    './public/index.html',       // Si vous utilisez le fichier HTML dans public
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};


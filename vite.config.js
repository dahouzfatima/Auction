import { defineConfig } from 'vite';

export default defineConfig({
  root: './resources',
  build: {
    outDir: '../public',
  },
  server: {
    proxy: {
      '/app': 'http://localhost', // Exemple de proxy pour se connecter à l'API Laravel
    },
  },
});

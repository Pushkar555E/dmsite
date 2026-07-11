import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  server: {
    port: 5174,
    strictPort: true
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        services: resolve(__dirname, 'services.html'),
        pricing: resolve(__dirname, 'pricing.html'),
        portfolio: resolve(__dirname, 'portfolio.html'),
        blog: resolve(__dirname, 'blog.html'),
        contact: resolve(__dirname, 'contact.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        terms: resolve(__dirname, 'terms.html'),
        refund: resolve(__dirname, 'refund.html'),
        notFound: resolve(__dirname, '404.html')
      }
    }
  }
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import dts from 'vite-plugin-dts';

const path = require('path');

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'LicenseKeyboard',
      formats: ['es', 'umd'],
      fileName: (format) => `vehicle-plate-keyboard.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});

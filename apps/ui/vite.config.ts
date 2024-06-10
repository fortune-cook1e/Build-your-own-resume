/// <reference types='vitest' />
import { defineConfig } from 'vite';
import { resolve, join } from 'node:path';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';

const fileName = {
  es: `index.mjs`,
  cjs: `index.cjs`,
};

const formats = Object.keys(fileName) as Array<keyof typeof fileName>;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      entryRoot: 'src',
      tsconfigPath: join(import.meta.dirname, 'tsconfig.lib.json'),
    }),
  ],

  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },

  build: {
    emptyOutDir: true,
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'ui',
      formats,
      fileName: (format) => fileName[format],
    },
    rollupOptions: {
      // external: [/^react.*/, /^@radix-ui\/*/],
      external: [/^react.*/],
    },
  },
});

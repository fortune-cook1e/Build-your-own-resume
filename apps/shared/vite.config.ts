/// <reference types="vitest" />
import path from 'path';
import { defineConfig } from 'vite';
import packageJson from './package.json';
import dts from 'vite-plugin-dts';

const getPackageName = () => {
  return packageJson.name;
};

const fileName = {
  es: `index.mjs`,
  cjs: `index.cjs`,
};

const formats = Object.keys(fileName) as Array<keyof typeof fileName>;

const config = defineConfig({
  plugins: [
    dts({
      entryRoot: 'src',
      tsconfigPath: 'tsconfig.json',
    }),
  ],
  base: './',
  clearScreen: false,
  build: {
    outDir: './dist',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'resumeGeneratorUtils',
      formats,
      fileName: (format) => fileName[format],
    },
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});

export default config;

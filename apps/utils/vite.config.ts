/// <reference types="vitest" />
import path from 'path';
import { defineConfig } from 'vite';
import packageJson from './package.json';

const getPackageName = () => {
  return packageJson.name;
};

const fileName = {
  es: `index.mjs`,
  cjs: `index.cjs`,
  iife: `index.iife.js`,
};

const formats = Object.keys(fileName) as Array<keyof typeof fileName>;

module.exports = defineConfig({
  base: './',
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

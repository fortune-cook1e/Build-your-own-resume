module.exports = {
  env: { browser: true, es2020: true, node: true, jest: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  settings: {
    react: {
      version: '18.2', // 这里指定 React 版本
    },
  },
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/self-closing-comp': 1,
    'react/react-in-jsx-scope': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/no-explicit-any': 1,
    'react/prop-types': 0,
  },
};

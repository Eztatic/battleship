import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {languageOptions: {globals: globals.browser}},
  pluginJs.configs.recommended,
  eslintPluginPrettier,
  {
    ignores: ['webpack.config.js', 'dist', 'eslint.config.mjs'],
  },
  {
    rules: {
      'capitalized-comments': ['error', 'always'],
      'no-unused-vars': 'off',
      'no-undef': 'warn',
      'arrow-body-style': ['error', 'always'],
      'quote-props': ['error', 'as-needed'],
    },
  },
];

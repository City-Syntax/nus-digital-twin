import astroPlugin from 'eslint-plugin-astro';
import tsParser from '@typescript-eslint/parser';
import astroParser from 'astro-eslint-parser';

export default [
  {
    ignores: ['dist/**', 'node_modules/**'],
  },

  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },

  {
    files: ['**/*.astro'],
    plugins: {
      astro: astroPlugin,
    },
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.astro'],
      },
    },
    rules: {
      ...astroPlugin.configs.recommended.rules,
    },
  },
];

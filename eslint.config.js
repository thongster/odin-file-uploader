const globals = require('globals');
const eslint = require('@eslint/js');
const prettier = require('eslint-config-prettier');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = [
  eslint.configs.recommended,

  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
    },

    plugins: {
      prettier: prettierPlugin,
    },

    rules: {
      'prettier/prettier': 'warn',
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },

  prettier,
];

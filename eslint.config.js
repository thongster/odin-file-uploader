const globals = require('globals');
const eslint = require('@eslint/js');
const prettier = require('eslint-config-prettier');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = [
  // 🚫 Replaces .eslintignore
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      '.next/**',
    ],
  },

  // ✅ ESLint recommended base rules
  eslint.configs.recommended,

  // ✅ Your project rules (applied to JS files)
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        ...globals.browser,
      },
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

  // ✅ Disable ESLint formatting rules that conflict with Prettier
  prettier,
];

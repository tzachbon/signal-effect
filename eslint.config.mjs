import noOnlyTests from 'eslint-plugin-no-only-tests';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['**/node_modules', '**/dist'],
  },
  ...compat.extends(
    'eslint:recommended',
    'prettier',
    'plugin:@typescript-eslint/strict',
    'plugin:@typescript-eslint/stylistic',
  ),
  {
    plugins: {
      'no-only-tests': noOnlyTests,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'module',
      parserOptions: {
        project: ['./tsconfig.eslint.json', './**/tsconfig.eslint.json'],
      },
    },

    rules: {
      'no-only-tests/no-only-tests': 'error',
      'no-console': 'error',
    },
  },
  ...compat
    .extends(
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
    )
    .map((config) => ({
      ...config,
      files: ['**/*.ts', '**/*.tsx'],
    })),
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',
      parserOptions: {
        EXPERIMENTAL_useProjectService: true,
      },
    },

    rules: {
      '@typescript-eslint/no-use-before-define': 'off',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/no-floating-promises': ['error'],
      '@typescript-eslint/restrict-template-expressions': 'off',
    },
  },
];

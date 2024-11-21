import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';
import { fixupConfigRules } from '@eslint/compat';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  recommendedConfig: {},
});

export default [
  ...fixupConfigRules(
    compat.config({
      extends: [
        '@react-native',
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:react/recommended',
      ],
      plugins: ['eslint-plugin-prettier'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
      rules: {
        '@typescript-eslint/dot-notation': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-non-null-assertion': 'warn',
        '@typescript-eslint/no-shadow': 'warn',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/restrict-plus-operands': 'off',
        'consistent-return': 'off',
        'import/order': 'off',
        'react-hooks/exhaustive-deps': 'warn',
        'new-cap': 'off',
        'no-use-before-define': 'off',
        'no-warning-comments': 'warn',
        'sort-keys': 'off',
        camelcase: [
          'error',
          { allow: ['expiration_year', 'expiration_month'] },
        ],
      },
      ignorePatterns: [
        '**/*.cjs',
        '**/*.mjs',
        '**/*.js',
        'dist',
        '**/*.test.ts',
        'jest.config.js',
      ],
      root: true,
    })
  ),
];

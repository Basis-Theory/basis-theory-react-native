module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:react/recommended',
  ],
  plugins: ['eslint-plugin-prettier'],
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
    'new-cap': 'off',
    'no-use-before-define': 'off',
    'no-warning-comments': 'warn',
    'sort-keys': 'off',
    camelcase: ['error', { allow: ['expiration_year', 'expiration_month'] }],
  },
  root: true,
};

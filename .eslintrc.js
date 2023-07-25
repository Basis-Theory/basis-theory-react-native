module.exports = {
  extends: [
    'get-off-my-lawn',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:react/recommended',
  ],
  plugins: ['eslint-plugin-prettier'],
  rules: {
    'import/order': 'off',
    'sort-keys': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
  },
  root: true,
};

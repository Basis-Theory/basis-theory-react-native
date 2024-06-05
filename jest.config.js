module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  displayName: 'Jest',
  transformIgnorePatterns: [],
  transform: {'\\.(js|jsx|ts|tsx)$': '@sucrase/jest-plugin'},
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      lines: 80,
      functions: 80,
    },
  },
};

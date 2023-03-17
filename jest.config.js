module.exports = {
  preset: 'jest-puppeteer',
  testEnvironment: 'node',
  transform: {
      '^.+\\.js$': 'babel-jest',
  },
  setupFilesAfterEnv: ['@jest/expect']
};
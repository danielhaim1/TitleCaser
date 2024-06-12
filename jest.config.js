// jest.config.js
module.exports = {
  transform: {
    '^.+\\.js$': 'esbuild-jest'
  },
  testEnvironment: 'node',
  verbose: true
};
// jest.config.js
module.exports = {
  transform: {
    '^.+\\.js$': 'esbuild-jest'
  },
  testEnvironment: 'node', // Set the test environment to Node.js
  verbose: true
};
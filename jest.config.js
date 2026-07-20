module.exports = {
	transform: {
	  '^.+\\.js$': 'babel-jest',
	  '^.+\\.ts$': 'ts-jest'
	},
	testEnvironment: 'jsdom',
	verbose: true,
	noStackTrace: false,
	collectCoverage: true,
	coveragePathIgnorePatterns: [
	  '<rootDir>/dist/',
	  '<rootDir>/docs/'
	],
	modulePathIgnorePatterns: [
	  '<rootDir>/docs/_data'
	],
	coverageThreshold: {
	  global: {
	    statements: 98,
	    branches: 94,
	    functions: 99,
	    lines: 99
	  }
	},
	testMatch: ['**/*.(test|spec).(js|ts)']
  };
  

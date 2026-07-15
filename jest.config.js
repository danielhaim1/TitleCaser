module.exports = {
	transform: {
	  '^.+\\.js$': 'babel-jest',
	  '^.+\\.ts$': 'ts-jest'
	},
	testEnvironment: 'jsdom',
	verbose: true,
	noStackTrace: false,
	collectCoverage: true,
	modulePathIgnorePatterns: [
	  '<rootDir>/docs/_data'
	],
	testMatch: [
	  '**/__tests__/**/*.(js|ts)',
	  '**/*.(test|spec).(js|ts)'
	]
  };
  

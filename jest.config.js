module.exports = {
	transform: {
	  '^.+\\.js$': 'babel-jest',
	  '^.+\\.ts$': 'ts-jest'
	},
	testEnvironment: 'jsdom',
	verbose: true,
	noStackTrace: false,
	collectCoverage: true,
	testMatch: [
	  '**/__tests__/**/*.(js|ts)',
	  '**/*.(test|spec).(js|ts)'
	]
  };
  
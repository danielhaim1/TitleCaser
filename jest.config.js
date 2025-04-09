module.exports = {
	transform: {
	  '^.+\\.js$': 'babel-jest'
	},
	testEnvironment: 'jsdom',
	verbose: true,
	noStackTrace: false,
	collectCoverage: true
  };
  
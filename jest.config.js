module.exports = {
	transform: {
		'^.+\\.js$': 'esbuild-jest'
	},
	testEnvironment: 'jsdom',
    verbose: true,
};

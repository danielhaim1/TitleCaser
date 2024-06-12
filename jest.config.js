module.exports = {
	transform: {
		'^.+\\.js$': require.resolve('esbuild-jest')
	},
	testEnvironment: 'jsdom',
	verbose: true
};
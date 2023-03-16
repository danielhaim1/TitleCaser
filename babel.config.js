module.exports = {
	presets: [
	  ['@babel/preset-env', {
		targets: { node: 'current' },
		modules: 'commonjs'
	  }]
	],
	ignore: ['node_modules'],
	include: ['./api/**/*.js'],
	plugins: [
	  '@babel/plugin-proposal-object-rest-spread',
	  '@babel/plugin-proposal-class-properties'
	],
	sourceMaps: false
  };
  
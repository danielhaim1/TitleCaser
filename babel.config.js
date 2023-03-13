module.exports = {
	presets: [
	  ['@babel/preset-env', {
		targets: { node: 'current' },
		modules: 'commonjs'
	  }]
	],
	ignore: ['node_modules'],
	include: ['./api/**/*.js'],
	plugins: [],
	sourceMaps: true
  };
  
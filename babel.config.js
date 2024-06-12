module.exports = {
  presets: [ 
    [ '@babel/preset-env', { 
      targets: { node: 'current' }, 
      modules: false
    } ] 
  ],
  ignore: [ 'node_modules' ],
  include: [
    './src/**/**.js',
    './index.js',
  ],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties'
  ],
  sourceMaps: false,
};
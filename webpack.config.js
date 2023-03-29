const path = require('path');
const isDevelopment = process.env.NODE_ENV === 'development';
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    target: 'node',
    entry: './src/index.js',
  // devtool: 'source-map',

    output: {
        filename: 'titlecase.js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        minimize: false,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                },
            }),
        ],
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                },
            },
        }, ],
    },
    externals: nodeExternals({
        allowlist: ['@babel/runtime-corejs3']
    })
};
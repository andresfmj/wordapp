const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/template/index.html',
		}),
	],
	devtool: 'inline-source-map',
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'dist'),
		},
		historyApiFallback: true,
		compress: true,
		port: 9000,
		disableHostCheck: true,
	},
};

module.exports = config;

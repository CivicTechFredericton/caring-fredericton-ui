'use strict';

const webpack = require('webpack');

module.exports = {
	mode: 'development',
	entry: [
		'react-hot-loader/patch'
	],
	performance: {
		hints: false
	},
	output: {
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.(css|scss)$/,
				use: [
					'style-loader',
					'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]',
					'sass-loader'
				]
			}
		]
	},
	plugins: [
    new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
	],
	devtool: 'source-map',
	devServer: {
		historyApiFallback: true,
		https: true,
		hot: true,
    inline: true,
		stats: {
			colors: true,
			chunks: false,
			children: false
		}
	}
}

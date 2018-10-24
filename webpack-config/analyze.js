'use strict';

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const merge = require('webpack-merge');


module.exports = merge(
		require('./build'),
		{
			plugins: [
				new BundleAnalyzerPlugin({
					analyzerMode: 'server',
					analyzerPort: 8888,
					reportFilename: 'report.html',
					openAnalyzer: true,
					generateStatsFile: true,
					statsFilename: 'stats.json',
					statsOptions: null,
					logLevel: 'info'
				})
			]
		}
);

'use strict';

const webpack = require('webpack');
const PATHS = require('./paths');

const CleanPlugin = require('clean-webpack-plugin');
// Starting with Webpack v4, extract-text-webpack-plugin is being deprecated.  Replacing with mini-css-extract-plugin for better future compatibility.
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'production',
  output: {
    path: PATHS.build,
    publicPath: '/',
    filename: '[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.(scss|css|sass)?$/,
        use:  [
          MiniCssExtractPlugin.loader,
          'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]',
          'sass-loader'
        ]
      }
    ]
  },
	devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
    new CleanPlugin([PATHS.build], {
      root: process.cwd() // because Windows
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[hash].css',
      chunkFilename: 'styles/[id].[hash]css',
      allChunks: true
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  ],

  optimization: {
    splitChunks: { // CommonsChunkPlugin()
      name: 'vendor',
      minChunks: 2
      //minChunks: ({ resource }) => /node_modules/.test(resource)
    },
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          mangle: {
            ie8: true,
            keep_fnames: true
          },
          compress: {
            ie8: true,
            warnings: false
          },
          output: {
            beautify: false,
            comments: false
          }
        },
        sourceMap: true,
      })
    ]
  }
};

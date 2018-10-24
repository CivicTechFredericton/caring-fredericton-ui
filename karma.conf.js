const path = require('path');
const webpack = require('./webpack.config')({ env: 'test' });

delete webpack.entry;

module.exports = function karmaConfig(config) {
  config.set({
    basePath: './',
    frameworks: [ 'mocha', 'chai' ],
    reporters: [ 'mocha' ],
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'test/index.js'
    ],
    preprocessors: {
      'test/index.js': [ 'webpack', 'sourcemap' ]
    },
    browsers: [ 'PhantomJS' ],
    webpack: webpack,
    webpackMiddleware: {
      noInfo: true
    },
    mochaReporter: {
      showDiff: true
    },
    reporters: [ 'progress', 'coverage-istanbul' ],
    coverageIstanbulReporter: {
      reports: [ 'lcov' ]
    }
  });
};

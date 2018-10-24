const merge = require('webpack-merge');
const dev = require('../webpack-config/dev.js');
const common = require('../webpack-config/common.js');

delete common.plugins;

module.exports = config => merge(
  // we want everything from common except the plugins
  Object.assign({}, common('dev'), { plugins: [] }),

  // we only want the modules from dev
  { module: dev.module },

  config
)

const merge = require('webpack-merge');
const defaultSettings = require('../settings_default.json');
const pkg = require('../package.json');

module.exports = (config) => Object.assign(
  {},
  {
    RELEASE: new Date().getTime(),
    VERSION: pkg.version
  },
  merge(defaultSettings, require(`../configs/${config}.json`))
);

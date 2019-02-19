const webpackConfig = require('../config/webpack.config');

module.exports = (baseConfig, env, defaultConfig) => {
    defaultConfig.plugins = [ ...baseConfig.plugins, webpackConfig.plugins[0] ];
    return defaultConfig;
};

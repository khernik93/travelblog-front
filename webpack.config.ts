/* tslint:disable: variable-name max-line-length */

import {
  HOST,
  STORE_DEV_TOOLS,
  DEV_PORT,
  PROD_PORT,
  PROD_DEVTOOL,
  DEV_DEVTOOL,
  EXCLUDE_SOURCE_MAPS,
  MY_COPY_FOLDERS,
  MY_CLIENT_PLUGINS,
  MY_CLIENT_PRODUCTION_PLUGINS,
  MY_CLIENT_DEVSERVER_PLUGINS,
  MY_CLIENT_RULES,
} from './constants';

const { DefinePlugin } = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { root, getMultipleFiles } = require('./helpers.js');

const EVENT = process.env.npm_lifecycle_event || '';
const AOT = EVENT.includes('aot');
const DEV_SERVER = EVENT.includes('webdev');
const PROD = EVENT.includes('prod');
const TEST = EVENT.includes('test');

const PORT = PROD ? PROD_PORT : DEV_PORT;
const ENV = PROD ? 'production' : 'development';

console.log('PRODUCTION BUILD: ', PROD);
console.log('AOT: ', AOT);

/**
 * Logic for copying folders
 */
const COPY_FOLDERS = (() => {
  const folders = MY_COPY_FOLDERS;

  if (!DEV_SERVER) {
    folders.unshift({ from: 'src/index.html' });
  }

  return folders;
})();

/**
 * Variables to be exposed in runtime
 */
const CONSTANTS = {
  DEV_SERVER: DEV_SERVER,
  ENV: JSON.stringify(ENV),
  HOST: JSON.stringify(HOST),
  PORT: PORT,
  STORE_DEV_TOOLS: JSON.stringify(STORE_DEV_TOOLS)
};

/**
 * Config
 */
const outputConfig = (function webpackConfig(): WebpackConfig {
  let config: WebpackConfig = Object.assign({});

  config.mode = ENV;
  config.cache = true;
  config.target = 'web';
  config.devtool = PROD ? PROD_DEVTOOL : DEV_DEVTOOL;

  config.entry = {
    main: root('./src/main.browser.ts'),
  };

  config.output = {
    path: root('dist'),
    filename: 'bundle.js',
  };

  config.devServer = {
    contentBase: AOT ? './compiled' : './src',
    port: PORT,
    historyApiFallback: {
      disableDotRule: true,
    },
    stats: 'minimal',
    host: '0.0.0.0',
    watchOptions: {
      poll: undefined,
      aggregateTimeout: 300,
      ignored: /node_modules/
    }
  };

  config.performance = {
    hints: false,
  };

  config.resolve = {
    extensions: ['.ts', '.js', '.json']
  };

  config.module = {
    rules: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [EXCLUDE_SOURCE_MAPS],
      },
      {
        test: /\.ts$/,
        loaders: [
          '@angularclass/hmr-loader',
          'awesome-typescript-loader?{configFileName: "tsconfig.json"}',
          'angular2-template-loader',
          'angular-router-loader?loader=system&genDir=compiled&aot=' + AOT,
        ],
        exclude: [/\.(e2e|d)\.ts$/],
      },
      {
        type: 'javascript/auto',
        test: /\.json/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'file-loader',
            options: { name: '[name].[ext]' },
          },
        ],
      },
      { test: /\.html/, loader: 'raw-loader', exclude: [root('src/index.html')] },
      { test: /\.css$/, loader: 'raw-loader' },
      {
        test: /\.scss$/,
        loaders: ['to-string-loader', 'css-loader', 'sass-loader'],
      },
      ...MY_CLIENT_RULES
    ]
  };

  config.plugins = [
    new DefinePlugin(CONSTANTS),
    new CopyWebpackPlugin(COPY_FOLDERS),
    ...MY_CLIENT_PLUGINS
  ];

  if (PROD) {
    config.plugins.concat(MY_CLIENT_PRODUCTION_PLUGINS);
  }
  
  if (DEV_SERVER) {
    config.plugins.concat(MY_CLIENT_DEVSERVER_PLUGINS);
  }

  return config;
})();

if (TEST) {
  outputConfig.entry = getMultipleFiles('./test/**/*.ts');
  outputConfig.output.filename = 'bundle.test.js';
}

module.exports = outputConfig;

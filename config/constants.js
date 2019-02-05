"use strict";
const root = require('./helpers.js').root
const ip = require('ip');

const {
  ProgressPlugin,
  NoEmitOnErrorsPlugin,
} = require('webpack');

const CompressionPlugin = require('compression-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Set basic config data
 */
exports.HOST = ip.address();
exports.DEV_PORT = 3000;
exports.PROD_PORT = 8088;
exports.PROD_DEVTOOL = 'source-map';
exports.DEV_DEVTOOL = 'eval-source-map';

exports.SHOW_BUNDLE_ANALYZER = false;

/**
 * specifies which @ngrx dev tools will be available when you build and load
 * your app in dev mode. Options are: logger | none
 */
exports.STORE_DEV_TOOLS = 'logger'

/**
 * these packages have problems with their sourcemaps
 */
exports.EXCLUDE_SOURCE_MAPS = [
  root('node_modules/@angular'),
  root('node_modules/@nguniversal'),
  root('node_modules/rxjs')
]

/** 
 * use this for folders you want to be copied in to Client dist
 * index.html is already copied by default.
 * format is { from: 'folder_name', to: 'folder_name' }
 */
exports.MY_COPY_FOLDERS = [
  { from: root('dist_root') }
]

/**
 * use this to import your own webpack config Client plugins.
 */
exports.MY_CLIENT_PLUGINS = [
  new ProgressPlugin(),
  new CheckerPlugin(),
  new NamedModulesPlugin(),
  new FilterWarningsPlugin({
    exclude: /System\.import/,
  })
]

/**
 * use this to import your own webpack config plugins for production use.
 */
exports.MY_CLIENT_PRODUCTION_PLUGINS = [
  new NoEmitOnErrorsPlugin(),
  new CompressionPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.js$|\.html$/,
    threshold: 10240,
    minRatio: 0.8,
  }),
  new UglifyJsPlugin({
    uglifyOptions: {
      output: {
        comments: false,
        beautify: false,
      },
    },
  })
]

/**
 * use this to import your own webpack config plugins for dev server
 */
exports.MY_CLIENT_DEVSERVER_PLUGINS = [
  new HtmlWebpackPlugin({
    template: root('src/index.html'),
    inject: false,
  })
]

/**
 * use this to import your own rules for Client webpack config.
 */
exports.MY_CLIENT_RULES = []

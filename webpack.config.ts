import {
  HOST,
  STORE_DEV_TOOLS,
  DEV_PORT,
  PROD_PORT,
  PROD_DEVTOOL,
  DEV_DEVTOOL,
  MY_COPY_FOLDERS,
  MY_CLIENT_PLUGINS,
  MY_CLIENT_PRODUCTION_PLUGINS,
  MY_CLIENT_DEVSERVER_PLUGINS,
  MY_CLIENT_RULES,
  SHOW_BUNDLE_ANALYZER,
  EXCLUDE_SOURCE_MAPS
} from './constants';
import { DefinePlugin } from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { root } from './helpers.js';

const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const EVENT = process.env.npm_lifecycle_event || '';
const DEV_SERVER = EVENT.includes('webdev');
const PROD = EVENT.includes('prod');

const PORT = PROD ? PROD_PORT : DEV_PORT;
const ENV = PROD ? 'production' : 'development';

console.log('PRODUCTION BUILD: ', PROD);

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
const outputConfig = function webpackConfig(env: any = {}) {

  const IS_TEST = !!env.TEST;
  const IS_AOT = !!env.AOT;
  console.log('AOT BUILD ', IS_AOT);
  console.log('TEST BUILD: ', IS_TEST);

  let config: WebpackConfig = Object.assign({});
  const TSCONFIG_PATH = IS_TEST ? './tsconfig.test.json' : './tsconfig.json';

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
    contentBase: './src',
    port: PORT,
    historyApiFallback: {
      disableDotRule: true,
    },
    stats: 'minimal',
    host: '127.0.0.1',
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
          `awesome-typescript-loader?{configFileName: "${TSCONFIG_PATH}"}`,
          'angular2-template-loader',
          'angular-router-loader?loader=system&genDir=compiled&aot=true',
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

  if (IS_AOT) {
    config.module.rules.push({
      test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
      loader: '@ngtools/webpack'
    });
  }

  config.plugins = [
    new DefinePlugin(CONSTANTS),
    new CopyWebpackPlugin(COPY_FOLDERS),
    ...MY_CLIENT_PLUGINS
  ];

  if (SHOW_BUNDLE_ANALYZER) {
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  if (PROD) {
    config.plugins.concat(MY_CLIENT_PRODUCTION_PLUGINS);
  }
  
  if (DEV_SERVER) {
    config.plugins.concat(MY_CLIENT_DEVSERVER_PLUGINS);
  }

  if (IS_AOT) {
    config.plugins.push(new AngularCompilerPlugin({
      tsConfigPath: TSCONFIG_PATH,
      mainPath: './src/main.browser.ts',
      entryModule: './src/modules/app/app.module#AppModule',
      sourceMap: true
    }));
  }

  return config;
};

module.exports = outputConfig;

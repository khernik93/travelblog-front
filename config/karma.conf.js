var path = require('path');
var webpackConfig = require('./webpack.test.config');

const TESTS_REPORT_DIR = '../tests-report';

module.exports = function (config) {
  var _config = {
    basePath: '',

    frameworks: ['jasmine'],

    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-mocha-reporter'),
      require('karma-sourcemap-loader'),
      require('karma-webpack'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-htmlfile-reporter')
    ],

    files: [
      { pattern: './karma-test-shim.js', watched: false }
    ],

    preprocessors: {
      './karma-test-shim.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    },

    webpackServer: {
      noInfo: false
    },

    reporters: ['mocha', 'coverage-istanbul', 'html'],

    mochaReporter: {
      output: 'noFailures'
    },

    coverageIstanbulReporter: {
      // reports can be any that are listed here: https://github.com/istanbuljs/istanbuljs/tree/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib
      reports: ['html', 'lcovonly', 'text-summary'],
 
      // base output directory. If you include %browser% in the path it will be replaced with the karma browser name
      dir: path.join(__dirname, `${TESTS_REPORT_DIR}/coverage`),
 
      // Combines coverage information from multiple browsers into one report rather than outputting a report
      // for each browser.
      combineBrowserReports: true,
 
      // if using webpack and pre-loaders, work around webpack breaking the source path
      fixWebpackSourcePaths: true,
 
      // Omit files with no statements, no functions and no branches from the report
      skipFilesWithNoCoverage: true,
 
      // Most reporters accept additional config options. You can pass these through the `report-config` option
      'report-config': {
        // all options available at: https://github.com/istanbuljs/istanbuljs/blob/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib/html/index.js#L135-L137
        html: {
          // outputs the report in ./coverage/html
          subdir: 'html'
        }
      },
 
      // enforce percentage thresholds
      // anything under these percentages will cause karma to fail with an exit code of 1 if not running in watch mode
      thresholds: {
        emitWarning: false, // set to `true` to not fail the test command when thresholds are not met
        // thresholds for all files
        global: {
          statements: 65,
          lines: 65,
          branches: 65,
          functions: 65
        },
        // thresholds per file
        each: {
          statements: 0,
          lines: 0,
          branches: 0,
          functions: 0
        }
      },
 
      verbose: true // output config used by istanbul for debugging
    },

    htmlReporter: {
      outputFile: `${TESTS_REPORT_DIR}/report.html`
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    singleRun: true,
    browsers: ['ChromeHeadless']
  };

  config.set(_config);
};

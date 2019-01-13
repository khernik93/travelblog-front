var path = require('path');
var webpackConfig = require('./webpack.config');

module.exports = function (config) {
    var _config = {
        basePath: '',

        frameworks: ['jasmine'],
        plugins: [
            require('karma-jasmine'),
            require('karma-phantomjs-launcher'),
            require('karma-chrome-launcher'),
            require('karma-coverage'),
            require('karma-spec-reporter'),
            require('karma-junit-reporter'),
            require('karma-sourcemap-loader'),
            require('karma-webpack')
        ],

        files: [
            { pattern: './karma-test-shim.js', watched: false }
        ],

        preprocessors: {
            './karma-test-shim.js': ['webpack', 'sourcemap'],
            'src/**/*.ts': ['coverage']
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            stats: 'errors-only'
        },

        webpackServer: {
            noInfo: true
        },

        reporters: ['spec', 'coverage', 'junit'],

        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        singleRun: true,
        customLaunchers: {
            ChromeHeadless: {
                base: 'Chrome',
                flags: [
                    '--no-sandbox',
                    // See https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md
                    '--headless',
                    '--disable-gpu',
                    // Without a remote debugging port, Google Chrome exits immediately.
                    ' --remote-debugging-port=9222'
                ]
            }
        },
        browsers: ['PhantomJS']
    };

    config.set(_config);
};

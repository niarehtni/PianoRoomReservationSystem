// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack

const webpackConfig = require('../../build/webpack.test.conf');

module.exports = function karmaConfig(config) {
  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.
    browsers: ['ChromeHeadless', 'ChromeHeadlessNoSandbox'],
    // you can define custom flags
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },

    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['progress','coverage'],
    files: ['./index.js'],
    preprocessors: {
      './index.js': ['webpack']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    port: 9876,
    coverageReporter: {
      dir: './coverage',
      reporters: [
        {type: 'lcov', subdir: '.'},
        {type: 'text-summary'}
      ]
    }
  })
}

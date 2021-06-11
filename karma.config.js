var { babel } = require('@rollup/plugin-babel')
var commonjs = require('@rollup/plugin-commonjs')
var { nodeResolve } = require('@rollup/plugin-node-resolve')
var tapSpec = require('tap-spec')

module.exports = function (config) {
  config.set({
    files: [
      './dist/tape.js',
      { pattern: 'app/tests/**/*.spec.js', watched: false }
    ],

    browserConsoleLogOptions: {
      level: 'error',
      format: '%b %T: %m',
      terminal: false
    },

    preprocessors: {
      'app/tests/**/*.spec.js': ['rollup']
    },

    reporters: ['tap-pretty'],
    browsers: ['ChromeHeadless'],
    frameworks: ['tap'],
    colors: true,
    singleRun: true,

    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: ['--headless']
      }
    },

    rollupPreprocessor: {
      external: ['tape'],
      plugins: [
        nodeResolve(),
        commonjs(),
        babel({
          exclude: /node_modules/,
          babelHelpers: 'runtime',
          skipPreflightCheck: true
        })
      ],
      output: {
        format: 'iife',
        name: 'RWCE',
        globals: {
          tape: 'tape'
        },
        sourcemap: false
      }
    },
    tapReporter: {
      prettify: tapSpec
    }
  })
}

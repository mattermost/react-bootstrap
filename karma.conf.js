const { DefinePlugin, ProvidePlugin } = require('webpack');

module.exports = config => {
  const { env } = process;

  config.set({
    frameworks: ['mocha', 'sinon-chai'],

    files: ['test/index.js'],

    preprocessors: {
      'test/index.js': ['webpack', 'sourcemap']
    },

    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                envName: 'test'
              }
            }
          }
        ]
      },
      plugins: [
        new ProvidePlugin({
          Buffer: ['buffer', 'Buffer']
        }),
        new ProvidePlugin({
          process: 'process/browser.js'
        }),
        new DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('test')
        })
      ],
      resolve: {
        fallback: {
          stream: require.resolve('stream-browserify')
        }
      },
      devtool: 'eval',
      stats: 'minimal'
    },

    webpackMiddleware: {
      noInfo: true
    },

    reporters: ['mocha', 'coverage'],

    mochaReporter: {
      output: 'autowatch'
    },

    coverageReporter: {
      type: 'lcov',
      dir: 'coverage'
    },

    customLaunchers: {
      ChromeCi: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    browsers: env.BROWSER ? env.BROWSER.split(',') : ['Chrome'],

    singleRun: env.CONTINUOUS_INTEGRATION === 'true'
  });
};

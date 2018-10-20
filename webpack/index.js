const { resolve } = require('path')
const vendor = require('./vendor')
const rules = require('./rules')
const plugins = require('./plugins')
const devServer = require('./dev_server')
const devtool = require('./devtool')
const settings = {
  resolve: {
    extensions: ['*', '.js', '.jsx', '.css', '.scss']
  },
  context: resolve(__dirname, '..'),
  entry: {
    app: ['react-hot-loader/patch', 'babel-polyfill', './src/index'],
    vendor
  },
  output: {
    filename: '[name].[hash].js',
    path: resolve(__dirname, '..', 'dist')
  },
  module: {
    rules
  },
  resolveLoader: {
    modules: ['node_modules']
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins,
  devServer,
  devtool
}
module.exports = settings

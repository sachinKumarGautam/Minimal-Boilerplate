const { resolve, join } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const isProduction = process.env.NODE_ENV === 'production'
const { GenerateSW } = require('workbox-webpack-plugin')
const dist = 'dist'
// the path(s) that should be cleaned
const pathsToClean = [`${dist}/*.*`]
// the clean options to use
const cleanOptions = {
  root: resolve(__dirname, '..'),
  exclude: [`${dist}/.gitignore`],
  verbose: true,
  dry: false
}
const plugins = [
  new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
  new CleanWebpackPlugin(pathsToClean, cleanOptions),
  new LodashModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    template: join('src', 'index.html')
  }),
  new ExtractTextPlugin(join(dist, 'bundle.css'), {
    allChunks: true
  }),
  // new webpack.optimize.CommonsChunkPlugin({
  //   name: 'vendor',
  //   minChunks: Infinity
  // }),
  new webpack.NamedModulesPlugin()
]
if (isProduction) {
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CopyWebpackPlugin([
      {
        from: require.resolve('workbox-sw'),
        to: 'workbox-sw.prod.js'
      }
    ]),
    new GenerateSW(
      {
        // globDirectory: dist,
        // globPatterns: ['**/*.{html,js,css}'],
        // swSrc: join('src', 'service-worker.js'),
        // swDest: join(dist, 'service-worker.js'),
        // clientsClaim: true,
        // skipWaiting: true,
        // navigateFallback: '/index.html'  // Learn about these config on https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#configuration
      }
    )
  )
} else {
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin()
  )
}
module.exports = plugins

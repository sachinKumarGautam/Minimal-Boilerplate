const { join } = require('path')
const devServer = {
  quiet: false,
  port: 3001,
  contentBase: join(__dirname, '..', 'dist'),
  hot: true,
  historyApiFallback: true,
  inline: true,
  noInfo: false,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: {
    assets: false,
    colors: true,
    version: false,
    hash: false,
    timings: false,
    chunks: true,
    chunkModules: true
  }
}
module.exports = devServer

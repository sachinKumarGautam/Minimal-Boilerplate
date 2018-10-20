const isProduction = process.env.NODE_ENV === 'production'
const devtool = isProduction ? 'source-map' : 'cheap-module-source-map'
module.exports = devtool

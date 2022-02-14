const webpack = require('webpack')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
  mode: 'production',
  devtool: 'source-map', //maybe remove?
  plugins: [
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('FIREBIRD'),
    }),
    new BundleAnalyzerPlugin(), //check this out
  ],
}

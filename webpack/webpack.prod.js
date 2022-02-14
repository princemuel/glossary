const webpack = require('webpack');
module.exports = {
  mode: 'production',
  devtool: 'source-map', //maybe remove?
  plugins: [
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('FIREBIRD'),
    }),
  ],
};

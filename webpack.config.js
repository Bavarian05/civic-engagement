const path = require('path');
const webpack = require('webpack');

const APP_DIR = path.resolve(__dirname, 'client');
const BUILD_DIR = path.resolve(__dirname, 'client/dist');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://' + require("os").hostname() + ':8000/',
    'webpack/hot/only-dev-server',
    APP_DIR + '/index.js'
  ],
  output: {
    path: BUILD_DIR,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?/,
        include: APP_DIR,
        exclude: /(node_modules)/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    hot: true,
    // enable HMR on the server

    contentBase: BUILD_DIR,
    // match the output path

    publicPath: '/'
    // match the output `publicPath`
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};

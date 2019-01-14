const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: './client/index.js',
  devtool: 'inline-source-map',
  plugins: [
    // new CleanWebpackPlugin(['./server/public/']),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './client/template.html',
    }),
  ],
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  mode: 'development',
}

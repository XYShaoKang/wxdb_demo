const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

// const generateFragmentTypes = require('./client/generate-fragment-types.exec')
const { PORT: API_PORT } = require('./server/config')
const babelConfig = require('./babel.config.client')

const API_HOST = `http://localhost:${API_PORT}`

// generateFragmentTypes(API_HOST)

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
  devServer: {
    proxy: {
      '/image': API_HOST,
      '/emoji': API_HOST,
      '/icon': API_HOST,
      '/voice': API_HOST,
      '/file': API_HOST,
      '/proxy': API_HOST,
      '/graphql': API_HOST,
    },
  },
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.exec\.js$/,
        include: [path.resolve(__dirname, 'client')],
        use: ['script-loader'],
      },
      {
        test: /\.m?js$/,
        include: [path.resolve(__dirname, 'client')],
        use: {
          loader: 'babel-loader',
          options: {
            ...babelConfig,
          },
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

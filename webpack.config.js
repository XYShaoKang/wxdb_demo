const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

// const generateFragmentTypes = require('./client/generate-fragment-types.exec')
const { PORT: API_PORT } = require('./server/config')
const babelConfig = require('./babel.config.client')

const API_HOST = `http://localhost:${API_PORT}`

// generateFragmentTypes(API_HOST)

// 默认样式解析
const defaultStyleUse = ['style-loader', 'css-loader']
// styled-jsx 样式解析
const styledJsxUse = [
  {
    loader: 'babel-loader',
    options: {
      ...babelConfig,
    },
  },
  {
    loader: require('styled-jsx/webpack').loader,
    options: {
      type: 'scoped',
    },
  },
]

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
        // 使用 styled-jsx 解析 client 下的 css
        test: /\.css$/,
        include: /client/,
        use: styledJsxUse,
      },
      {
        // 使用 styled-jsx 解析 client 下的 less
        test: /\.less$/,
        include: /client/,
        use: styledJsxUse,
      },
      {
        // 第三方包中的 css 使用默认解析
        test: /\.css$/,
        include: /node_modules/,
        use: defaultStyleUse,
      },
    ],
  },
  mode: 'development',
}

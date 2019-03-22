module.exports = {
  presets: [['@babel/preset-react'], ['@babel/preset-env']],
  plugins: [
    '@babel/plugin-transform-runtime',
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], // antd 按需加载
    '@babel/plugin-proposal-class-properties', // 在类中使用 箭头函数 静态属性 静态方法
    '@babel/plugin-proposal-optional-chaining', // 空值判断
    'import-graphql',
    [
      'styled-jsx/babel',
      {
        plugins: ['styled-jsx-plugin-less'],
        sourceMaps: true,
      },
    ],
  ],
}

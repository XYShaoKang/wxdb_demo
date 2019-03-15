module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  plugins: [
    // 在类中使用 箭头函数 静态属性 静态方法
    '@babel/plugin-proposal-class-properties',
    // 空值判断
    '@babel/plugin-proposal-optional-chaining',
    // 支持导入 schema.graphql
    'import-graphql',
  ],
}

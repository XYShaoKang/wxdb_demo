# 浏览微信数据库 Demo

[![deprecated](http://badges.github.io/stability-badges/dist/deprecated.svg)](http://github.com/badges/stability-badges)

## 要求

主要是[node-sqlcipher](https://github.com/journeyapps/node-sqlcipher#windows)的要求

- Visual Studio 2015
- Python 2.7

我电脑上安装了太多环境,所以不太确定是不是必须的,之前我没有装`Python`也正常可以安装,但是偶尔会失败,后来装了下`Python`感觉安装好了,可以先试试,如果有错误的话再装,至于`vs2015`我电脑上没装,估计是用来编译用的,不知道是不是因为之前装过`node-pre-gyp`的关系.

## 安装

```bash
yarn install
# 或 npm install
```

把`server/config.default.js`复制为`server/config.js`,然后填入对应的`key`和`password`,详细的获取方法可以查看[详细过程](./详细过程.md)

`server`目录下有两个文件夹`androidDB`放安卓端拿到的数据库,`pcDB`放 win 微信客户的数据库.

## 运行

```bash
yarn start
# 或 npm start
```

## 免责声明

使用者需明白,此仓库只是个玩具,代码不完善,很不完善,仅供研究和吐槽用,切勿用于实际运行,当然如果你非要运行,我也不会跑过去打你,当然我也未必打得过你.只是由此造成的一切后果自负.最后欢迎吐槽:smile:

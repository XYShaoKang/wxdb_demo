# 浏览微信数据库 Demo

> 请注意:本仓库已弃用,请关注 [wechat_browse_server](https://github.com/XYShaoKang/wechat_browse_server)

[![deprecated](http://badges.github.io/stability-badges/dist/deprecated.svg)](http://github.com/badges/stability-badges)

## 要求

主要是[node-sqlcipher](https://github.com/journeyapps/node-sqlcipher#windows)的要求

- Visual Studio 2015
- Python 2.7

我电脑上安装了太多环境,所以不太确定是不是必须的,之前我没有装`Python`也正常可以安装,但是偶尔会失败,后来装了下`Python`感觉安装好了,可以先试试,如果有错误的话再装,至于`vs2015`我电脑上没装,估计是用来编译用的,不知道是不是因为之前装过`node-pre-gyp`的关系.

### silk-sdk

需要编译环境

#### win10

```bash
npm install --global --production windows-build-tools
```

#### archlinux

```bash
pacman -S base-devel
pacman -S python2
npm config set python /usr/bin/python2
yarn global add node-gyp
```

### fluent-ffmpeg

需要 [ffmpeg](http://www.ffmpeg.org/)

## 安装

```bash
yarn install
# 或 npm install
```

把`server/config.default.js`复制为`server/config.js`,然后填入对应的`key`和`password`,详细的获取方法可以查看[详细过程](./详细过程.md)

`server`目录下有两个文件夹`androidDB`放安卓端拿到的数据库,`pcDB`放 win 微信客户的数据库.

安卓端资源目录`/sdcard/tencent/MicroMsg/XXXX`和`/sdcard/tencent/MicroMsg/Download`.`xxxx`跟数据目录下一样.要把这两个目录拷贝到`androidDB`下,才能取到图片和下载的文件.

## 运行

```bash
yarn start
# 或 npm start
```

## TODO

- [ ] 前端
  - [x] 展现聊天记录
  - [ ] 搜索功能
  - [x] 滚动加载
  - [x] 解析聊天记录
    - [x] 图片
    - [x] 表情
    - [x] app 消息
    - [x] 语音
    - [x] 小视频
  - [ ] 抽象基础组件
  - [ ] 错误处理
- [ ] 后端 API
  - [x] 获取好友信息
  - [x] 获取聊天记录
  - [ ] 完善 API 接口
    - [x] 安卓数据库 API
      - [x] 好友列表
      - [x] 消息列表
        - [x] 系统信息
        - [x] 图片消息
        - [x] 表情消息
        - [x] 语音
        - [x] 视频
        - [x] APP 消息
          - [x] 音乐类
          - [x] 视频类
          - [x] 文章类
          - [x] 文件类
          - [x] 游戏类
          - [x] 发送聊天记录
          - [x] 小程序
    - [ ] PC 数据库 API
      - [ ] 好友列表
      - [ ] 消息列表
      - [ ] 图片消息
      - [ ] 表情消息
      - [ ] 语音
      - [ ] 视频
  - [ ] 结构化
  - [ ] 添加测试
  - [ ] 组织目录结构
- [ ] 优化
  - [x] 位置图片获取频率过高时无法获取
    - [x] 每个图片第一次访问时使用网络,然后缓存图片,第二次访问直接读取缓存
  - [ ] 获取 app 图标时,有时大图标无法引用,有时小图标无法引用
  - [ ] 优化 client 编译速度
  - [ ] 设计 api

## 免责声明

使用者需明白,此仓库只是个玩具,代码不完善,很不完善,仅供研究和吐槽用,切勿用于实际运行,当然如果你非要运行,我也不会跑过去打你,当然我也未必打得过你.只是由此造成的一切后果自负.最后欢迎吐槽:smile:

import Router from 'koa-router'

import { proxyAsync } from '../controllers/proxy'
import {
  imageAsync,
  emojiAsync,
  iconAsync,
  voiceAsync,
  fileAsync,
} from '../controllers/file'
import {
  allDbsAsync,
  searchAsync,
  tablesAsync,
  tableDataAsync,
} from '../controllers/db'

const router = new Router()

router
  // 获取图片
  .get('/image', imageAsync)
  // 获取 emoji 表情
  .get('/emoji', emojiAsync)
  // 获取图标
  .get('/icon', iconAsync)
  // 获取音频
  .get('/voice', voiceAsync)
  // 根据 msgId 获取文件
  .get('/file', fileAsync)
  // 外部 url 访问
  .get('/proxy', proxyAsync)
  // 搜索数据库
  .get('/search', searchAsync)

module.exports = router

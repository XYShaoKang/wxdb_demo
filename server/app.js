const Koa = require('koa')
const serve = require('koa-static')
const path = require('path')
const fs = require('fs')
const app = new Koa()
const router = require('koa-router')()
const json = require('koa-json')
const {
  getAllTableName,
  getTable,
  getAllDbs,
  searchInDB,
  searchInAllDB,
  users,
  message,
  image,
  emoji,
  me,
} = require('./wechat')

const staticPath = path.join(__dirname, '../public/')
const rootPath = path.join(__dirname, './androidDB')

app.use(json())

app.use(serve(staticPath))

// 获取所有数据库列表
router.get('/dbs', async (ctx, next) => {
  const data = await getAllDbs()
  ctx.response.body = data
})

// 搜索,必须参数 platform text ,可选 dbName tName
router.get('/search', async (ctx, next) => {
  const { text, tName, dbName, platform } = ctx.query
  console.log(text, tName, dbName, platform)
  const data = dbName
    ? await searchInDB(text, platform, dbName)
    : await searchInAllDB(text, platform)
  ctx.response.body = data
})

// 获取用户列表
router.get('/users', async (ctx, next) => {
  const data = await users()
  ctx.response.body = data
})

// 获取聊天记录
router.get('/message', async (ctx, next) => {
  const { username } = ctx.query
  const data = await message(username)
  ctx.response.body = data
})

// 获取图片
router.get('/image', async (ctx, next) => {
  const { msgId } = ctx.query
  const data = await image(msgId)
  const imgPaths = data.map(d => {
    const imgPath = path.join(rootPath, d.path)
    return { ...d, imgPath, isExists: fs.existsSync(imgPath) }
  })

  ctx.response.type = 'image/png'
  ctx.response.body = fs.createReadStream(
    imgPaths.find(i => i.isExists).imgPath,
  )
})

// 获取聊天记录
router.get('/emoji', async (ctx, next) => {
  const { md5 } = ctx.query
  const data = await emoji(md5)
  ctx.response.body = data
})

// 获取本人的微信
router.get('/me', async (ctx, next) => {
  const data = await me()
  ctx.response.body = data
})

// 获取数据库所有表格
router.get('/tables/:platform/:dbName', async (ctx, next) => {
  const { platform, dbName } = ctx.params

  const tables = await getAllTableName(dbName, platform)
  if (tables.err) {
    ctx.response.body = tables
  } else {
    ctx.response.body = tables.sort(
      (a, b) =>
        a.tableName.toLocaleLowerCase().charCodeAt() -
        b.tableName.toLocaleLowerCase().charCodeAt(),
    )
  }
})

// 获取表格数据
router.get('/table/:platform/:dbName/:tName', async (ctx, next) => {
  const { dbName, tName, platform } = ctx.params
  const tables = await getTable(dbName, tName, platform)
  ctx.response.body = tables
})

app.use(router.routes())

app.listen(3000)

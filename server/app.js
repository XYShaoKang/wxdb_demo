const Koa = require('koa')
const serve = require('koa-static')
const path = require('path')
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
} = require('./wechat')

const staticPath = path.join(__dirname, '../public/')

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

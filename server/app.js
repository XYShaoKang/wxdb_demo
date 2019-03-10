const Koa = require('koa')
const serve = require('koa-static')
const path = require('path')
const fs = require('fs')
const fetch = require('node-fetch')
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
  user,
  message,
  image,
  emoji,
  me,
  voiceInfo,
  voiceStream,
  appInfo,
  wxappInfo,
  fileMd5,
  file,
} = require('./wechat')
const md5 = require('md5')
const mime = require('mime-types')
const PassThrough = require('stream').PassThrough
const { UIN } = require('./config')

const staticPath = path.join(__dirname, '../public/')
const rootPath = path.join(__dirname, './androidDB')

const iconPath = path.join(__dirname, './icons')
const iconIndexes = JSON.parse(
  fs.readFileSync(path.join(__dirname, './icons/index.json')),
)

const cachePath = path.join(__dirname, './cache')
if (!fs.existsSync(cachePath)) {
  fs.mkdirSync(cachePath)
}

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
  const { page, pageSize, type } = ctx.query

  const data = await users({ page, pageSize, type })
  ctx.response.body = data
})

// 获取用户信息
router.get('/user', async (ctx, next) => {
  const { username } = ctx.query
  const data = await user({ username })
  ctx.response.body = data
})

// 获取聊天记录
router.get('/message', async (ctx, next) => {
  const { username, page, pageSize, type } = ctx.query
  const data = await message({ username, page, pageSize, type })
  ctx.response.body = data
})

// 获取图片
router.get('/image', async (ctx, next) => {
  const { msgId, imgPath, url } = ctx.query

  if (url) {
    const fileName = path.join(cachePath, `${md5(new URL(url).pathname)}.jpg`)
    if (fs.existsSync(fileName)) {
      ctx.response.type = 'image/jpeg'
      ctx.response.body = fs.createReadStream(fileName)
    } else {
      ctx.body = await fetch(url).then(res => {
        res.body.pipe(fs.createWriteStream(fileName)).on('close', () => {
          // console.log(`${fileName} download done`)
        })
        ctx.response.type = res.headers.raw()['content-type'][0]
        return res.body.pipe(PassThrough())
      })
    }

    return
  }

  if (!imgPath && !msgId) {
    return
  }
  // 读取缩略图
  const imgName = imgPath && imgPath.split('//')[1]
  const imgP =
    imgName &&
    path.join(
      rootPath,
      `${md5('mm' + UIN)}//image2//${imgName.slice(3, 5)}//${imgName.slice(
        5,
        7,
      )}//${imgName}`,
    )

  if (fs.existsSync(imgP)) {
    // 读取缩略图
    ctx.response.type = 'image/png'
    ctx.response.body = fs.createReadStream(imgP)
  } else {
    const data = await image(msgId)
    const imgPaths = data.map(d => {
      const imgPath = path.join(rootPath, d.path)
      return { ...d, imgPath, isExists: fs.existsSync(imgPath) }
    })

    ctx.response.type = 'image/png'
    ctx.response.body = fs.createReadStream(
      imgPaths.find(i => i.isExists).imgPath,
    )
  }
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

// 获取音频信息
router.get('/voiceInfo', async (ctx, next) => {
  const { msgId } = ctx.query
  const data = await voiceInfo(msgId)
  ctx.response.body = data
})

// 获取音频信息
router.get('/proxy', async (ctx, next) => {
  const { url } = ctx.query
  if (url) {
    ctx.body = await fetch(url).then(res => {
      ctx.response.type = res.headers.raw()['content-type'][0]
      return res.body.pipe(PassThrough())
    })
  } else {
    ctx.body = ''
  }
})

// 获取图标
router.get('/icon', async (ctx, next) => {
  const { ext } = ctx.query

  const typeName = iconIndexes.find(
    icon => icon.fileExtensions && icon.fileExtensions.includes(ext),
  )
  const extIconPath = path.join(
    iconPath,
    `./${typeName ? typeName.name : 'file'}.svg`,
  )

  // console.log(iconIndexes[0].fileExtensions.includes)
  ctx.response.type = 'image/svg+xml'
  ctx.response.body = fs.createReadStream(extIconPath)
})

// 获取音频
router.get('/voice', async (ctx, next) => {
  const { msgId } = ctx.query
  const data = await voiceInfo(msgId)
  const voicePath = path.join(rootPath, data[0].path)
  ctx.response.type = 'audio/mpeg'

  ctx.body = voiceStream(voicePath)
    .on('error', ctx.onerror)
    .pipe(PassThrough())
})

// 获取音频
router.get('/file', async (ctx, next) => {
  const { msgId, type } = ctx.query
  const data = await file(msgId, type)

  const filePath = path.join(rootPath, data[0].path)
  ctx.response.type = mime.contentType(path.parse(filePath).base)

  ctx.body = fs.createReadStream(filePath)
})

// 获取 app 信息
router.get('/appInfo', async (ctx, next) => {
  const { appId } = ctx.query
  const data = await appInfo(appId)
  ctx.response.body = data
})

// 获取 wxappInfo 信息
router.get('/wxappInfo', async (ctx, next) => {
  const { username } = ctx.query
  const data = await wxappInfo(username)
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

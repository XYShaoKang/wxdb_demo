import path from 'path'
import fs from 'fs'
import fetch from 'node-fetch'
import md5 from 'md5'
import mime from 'mime-types'
import stream from 'stream'
import { image, emoji, voiceStream, file, voiceInfo } from '../wechat'
import { ANDROID_PATH, ICON_PATH, CACHE_PATH, UIN } from '../../config'

const PassThrough = stream.PassThrough
const iconIndexes = JSON.parse(
  fs.readFileSync(path.join(ICON_PATH, './index.json')),
)
const resourceDirName = md5(`mm${UIN}`)

if (!fs.existsSync(CACHE_PATH)) {
  fs.mkdirSync(CACHE_PATH)
}

// 获取图片
const imageAsync = async (ctx, next) => {
  const { msgId, imgPath, url } = ctx.query

  if (url) {
    const fileName = path.join(CACHE_PATH, `${md5(new URL(url).pathname)}.jpg`)
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
      ANDROID_PATH,
      `${resourceDirName}//image2//${imgName.slice(3, 5)}//${imgName.slice(
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
      const imgPath = path.join(ANDROID_PATH, d.path)
      return { ...d, imgPath, isExists: fs.existsSync(imgPath) }
    })

    ctx.response.type = 'image/png'
    ctx.response.body = fs.createReadStream(
      imgPaths.find(i => i.isExists).imgPath,
    )
  }
}

// 获取 emoji 表情
const emojiAsync = async (ctx, next) => {
  const { md5 } = ctx.query
  const data = await emoji(md5)
  ctx.response.body = data
}

// 获取图标
const iconAsync = async (ctx, next) => {
  const { ext } = ctx.query

  const typeName = iconIndexes.find(
    icon => icon.fileExtensions && icon.fileExtensions.includes(ext),
  )
  const extIconPath = path.join(
    ICON_PATH,
    `./${typeName ? typeName.name : 'file'}.svg`,
  )

  ctx.response.type = 'image/svg+xml'
  ctx.response.body = fs.createReadStream(extIconPath)
}

// 获取音频
const voiceAsync = async (ctx, next) => {
  const { msgId } = ctx.query
  const data = await voiceInfo(msgId)
  const voicePath = path.join(ANDROID_PATH, data[0].path)
  ctx.response.type = 'audio/mpeg'

  ctx.body = voiceStream(voicePath)
    .on('error', ctx.onerror)
    .pipe(PassThrough())
}

// 根据 msgId 获取文件
const fileAsync = async (ctx, next) => {
  const { msgId, type } = ctx.query
  const data = await file(msgId, type)

  const filePath = path.join(ANDROID_PATH, data[0].path)
  ctx.response.type = mime.contentType(path.parse(filePath).base)

  ctx.body = fs.createReadStream(filePath)
}

export { imageAsync, emojiAsync, iconAsync, voiceAsync, fileAsync }

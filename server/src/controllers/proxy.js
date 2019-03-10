import fetch from 'node-fetch'
import stream from 'stream'

const PassThrough = stream.PassThrough
// 外部 url 访问
const proxyAsync = async (ctx, next) => {
  const { url } = ctx.query
  if (url) {
    ctx.body = await fetch(url).then(res => {
      ctx.response.type = res.headers.raw()['content-type'][0]
      return res.body.pipe(PassThrough())
    })
  } else {
    ctx.body = ''
  }
}
export { proxyAsync }

import convert from 'xml-js'
import fs from 'fs'
import { decode } from 'silk-sdk'
import ffmpeg from 'fluent-ffmpeg'
import md5 from 'md5'

function xmlToObj(xmlText) {
  return JSON.parse(
    convert.xml2json(xmlText, {
      compact: true,
      spaces: 2,
      ignoreDeclaration: true,
      textKey: 'data',
      cdataKey: 'data',
    }),
  )
}

// silk 转 mp3
function voiceStream(path) {
  return ffmpeg(fs.createReadStream(path).pipe(decode({ quiet: true })))
    .inputFormat('s16le')
    .inputOptions(['-ar 24000', '-ac 1'])
    .format('mp3')
    .noVideo()
}

function fileMd5(filePath) {
  return new Promise(function(resolve, reject) {
    fs.readFile(filePath, function(err, buf) {
      if (err) {
        reject(err)
      }
      resolve(md5(buf))
    })
  })
}

// 解析 ~SEMI_XML~
function decodeSemiXml(paramString) {
  return paramString
    .split(/[\u0000]/)
    .slice(1)

    .reduce((prev, curr) => {
      const last = prev[prev.length - 1]
      if (prev.length === 0 || curr[1] === '.') {
        prev.push({ key: curr.split('.').slice(2), value: '' })
      } else {
        last.value = curr.slice(1)
      }
      return prev
    }, [])
    .reduce((prev, { key: keys, value }) => {
      let obj = prev
      if (keys.length === 0 || value.replace(/\s/g, '').length === 0) {
        return prev
      }
      keys.slice(0, -1).forEach(k => {
        if (!obj[k]) {
          obj[k] = {}
        }
        obj = obj[k]
      })
      obj[keys.slice(-1)[0]] = { data: value }
      return prev
    }, {})
}

export { xmlToObj, voiceStream, fileMd5, decodeSemiXml }

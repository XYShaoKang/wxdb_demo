const convert = require('xml-js')
const fs = require('fs')
const { decode } = require('silk-sdk')
var ffmpeg = require('fluent-ffmpeg')

function xmlToObj(xmlText) {
  return JSON.parse(convert.xml2json(xmlText, { compact: true, spaces: 4 }))
}

// silk 转 mp3
function voiceStream(path) {
  return ffmpeg(fs.createReadStream(path).pipe(decode({ quiet: true })))
    .inputFormat('s16le')
    .inputOptions(['-ar 24000', '-ac 1'])
    .format('mp3')
    .noVideo()
}

module.exports = {
  xmlToObj,
  voiceStream,
}

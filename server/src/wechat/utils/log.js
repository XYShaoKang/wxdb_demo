import path from 'path'
import fs from 'fs'

function log(fileName, text) {
  const cachePath = path.join(__dirname, './cache')
  if (!fs.existsSync(cachePath)) {
    fs.mkdirSync(cachePath)
  }
  const filePath = path.join(cachePath, fileName)
  fs.writeFileSync(filePath, text, 'utf8')
}

export { log }

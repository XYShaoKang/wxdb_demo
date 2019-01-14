const fs = require('fs')
const { of, zip } = require('rxjs')
const { map } = require('rxjs/operators')
const { PC_PATH, ANDROID_PATH } = require('../config')

const catalogs = {
  android: ANDROID_PATH,
  pc: PC_PATH,
}
function getDbs(platform) {
  return of(catalogs[platform]).pipe(
    map(p => fs.readdirSync(p)),
    map(files =>
      files
        .filter(fileName => /.db$/.test(fileName))
        .map(fileName => ({
          fileName: fileName.split('.')[0],
          platform,
        })),
    ),
  )
}
function getAllDbs() {
  const androidPath$ = getDbs('android')
  const pcPath$ = getDbs('pc')
  return zip(androidPath$, pcPath$).pipe(
    map(([android, pc]) => android.concat(pc)),
  )
}
module.exports = {
  getAllDbs,
}

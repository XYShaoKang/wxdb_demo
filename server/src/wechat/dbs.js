/**
 * @typedef FileInfo
 * @type {object}
 * @property {string} fileName
 * @property {string} platform
 */

import fs from 'fs'
import { of, zip } from 'rxjs'
import { map } from 'rxjs/operators'
import {
  PC_PATH,
  ANDROID_PATH,
  PLATFORM_ANDROID,
  PLATFORM_PC,
} from '../../config'

const catalogs = {
  android: ANDROID_PATH,
  pc: PC_PATH,
}
/**
 * 获取对应平台所有 DB 列表
 *
 * @param {string} platform 需要获取的平台
 * @returns {Rx.Observable.<FileInfo>} 返回对应平台包含所有 DB 列表的 Observable
 */
function getDbs$(platform) {
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
/**
 * 返回所有 DB 列表
 *
 * @returns {Rx.Observable.<FileInfo>} 返回包含所有 DB 列表的 Observable
 */
function getAllDbs$() {
  const androidPath$ = getDbs$(PLATFORM_ANDROID)
  const pcPath$ = getDbs$(PLATFORM_PC)
  return zip(androidPath$, pcPath$).pipe(
    map(([android, pc]) => android.concat(pc)),
  )
}

/**
 * 获取所有 DB 信息
 *
 * @returns {Promise<FileInfo>} 返回包含所有 DB 列表的 Observable
 */
function getAllDbs() {
  return getAllDbs$().toPromise()
}
export { getAllDbs$, getAllDbs }

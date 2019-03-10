import { connectAndroidDB$ } from './android'
import { connectPCDB$ } from './pc'
import { PLATFORM_ANDROID } from '../../config'
/**
 * 获取 DB 链接函数
 *
 * @param {string} dbName	需要链接数据库的名字
 * @param {string} platform	需要链接数据库的平台
 * @returns {function(): Rx.Observable.<Database>} 返回一个生产 DB 链接的函数
 */
function getConnectDB(platform, dbName) {
  return platform === PLATFORM_ANDROID
    ? () => connectAndroidDB$(dbName)
    : () => connectPCDB$(dbName)
}
export { getConnectDB }

const crypto = require('crypto')

const fs = require('fs')

/**
 * 获取 Salt
 *
 * @param {string} dbPath 需要获取 Salt 的 DB 路径
 * @returns {Promise<Buffer>} 返回包含 Salt 数据的 Promise
 */
function getSalt(dbPath) {
  return new Promise(function(resolve, reject) {
    fs.readFile(dbPath, { flag: 'r' }, function(err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data.slice(0, 16))
      }
    })
  })
}

/**
 * 哈希计算
 *
 * @param {string} password 哈希计算的密码
 * @param {Buffer} salt 哈希计算的 Salt
 * @returns {string} 返回哈希计算后的结果
 */
function getHash(password, salt) {
  return crypto
    .pbkdf2Sync(Buffer.from(password, 'hex'), salt, 64000, 32, 'sha1')
    .toString('hex')
}

/**
 * 哈希计算
 *
 * @param {string} password 哈希计算的密码
 * @param {string} dbPath 哈希计算的 DB 路径
 * @returns {string} 返回包含哈希计算后的结果的 Promise
 */
function hash(password, dbPath) {
  return getSalt(dbPath).then(salt => getHash(password, salt))
}

module.exports = { hash }

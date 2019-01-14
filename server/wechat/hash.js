const crypto = require('crypto')

const fs = require('fs')

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
function getHash(password, salt) {
  return crypto
    .pbkdf2Sync(Buffer.from(password, 'hex'), salt, 64000, 32, 'sha1')
    .toString('hex')
}
function hash(password, dbPath) {
  return getSalt(dbPath).then(salt => getHash(password, salt))
}

module.exports = { hash }

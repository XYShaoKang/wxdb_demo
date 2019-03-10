const path = require('path')
module.exports = {
  PC_PATH: path.join(__dirname, './pcDB/'),
  ANDROID_PATH: path.join(__dirname, './androidDB/'),
  // 修改为对应的密码
  PC_PASSWORD: '***',
  // 修改为对应的 key
  ANDROID_KEY: '***',
  PLATFORM_ANDROID: 'android',
  PLATFORM_PC: 'pc',
  UIN:'***'
}

var log = require('../../utils/log')
export function getAccessToken() {
  let accessToken = ""
  try {
    accessToken = wx.getStorageSync('accessToken')
  } catch (e) {
    log.error(JSON.stringify(e))
  }
  return accessToken
}

export function getRefreshToken() {
  let refreshToken = ""
  try {
    refreshToken = wx.getStorageSync('refreshToken')
  } catch (e) {
    log.error(JSON.stringify(e))
  }
  return refreshToken
}


export function setStorage(obj) {
  try {
    Object.keys(obj).forEach(key => {
      wx.setStorageSync(key, obj[key])
    })
  } catch (e) {
    log.error(JSON.stringify(e))
  }
}

export function checkExpired() {
  let ex = ""
  try {
    ex = wx.getStorageSync('expireAt')
    if (!ex) {
      return true
    }
    const expiredAt = parseInt(ex)
    return Date.now() > expiredAt * 1000
  } catch (e) {
    log.error(JSON.stringify(e))
  }
}
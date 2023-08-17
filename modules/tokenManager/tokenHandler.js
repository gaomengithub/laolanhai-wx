export function getAccessToken() {
  let accessToken = ""
  try {
    accessToken = wx.getStorageSync('accessToken')
  } catch (e) {
    console.log("getStorageSync读取出错。")
  }
  return accessToken
}

export function getRefreshToken() {
  let refreshToken = ""
  try {
    refreshToken = wx.getStorageSync('refreshToken')
  } catch (e) {
    console.log("getStorageSync读取出错。")
  }
  return refreshToken
}


export function setStorage(obj) {
  try {
    Object.keys(obj).forEach(key => {
      wx.setStorageSync(key, obj[key])
    })
  } catch (e) {
    console.log("Storage保存出错")
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
    console.log("getStorageSync读取出错。")
  }
}
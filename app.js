import Common from '$/utils/common'
import { loginForToken } from 'modules/tokenManager/getToken'
import { user } from "$/stores/user-store"
var log = require('$/utils/log.js')
App({
  onLaunch() {
    this.globalData.common = new Common()
    // 检查缓存
    checkStorage().then(() => {
      user.updateUserInfo()
    }).catch(e => {
      log.error(e)
    })
  },
  onShow(){
    if (!this.globalData.common) {
      this.onLaunch()
    }
  },
  globalData: {
    common: null,
  }
})

function checkStorage() {
  return new Promise((resolve, reject) => {
    const keys = ['accessToken', 'expireAt', 'nickName', 'openId', 'quals', 'refreshToken', 'id']

    let isAllKeyExist = true;
    for (const key of keys) {
      const value = wx.getStorageSync(key)
      if (!value) {
        isAllKeyExist = false;
        break;
      }
    }

    if (isAllKeyExist) {
      resolve()
    } else {
      loginForToken().then(() => resolve()).catch((error) => reject(error));
    }
  });
}
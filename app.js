import Common from '$/utils/common'
import { loginForToken } from 'modules/tokenManager/getToken'
import { user } from "$/stores/user-store"
App({
  onLaunch() {
    this.globalData.common = new Common()
    // 检查缓存，如果缓存指标全部合法，则调用user.updateUserInfo()
    checkStorage()
      .then(() => user.updateUserInfo())
      .catch(e => {
        // 错误上报
      })
  },
  onShow() {
    if (!this.globalData.common || !user.userInfo) {
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

    if (!isAllKeyExist) {
      loginForToken().then(() => resolve()).catch((error) => reject(error));
    } else {
      resolve()
    }
  });
}
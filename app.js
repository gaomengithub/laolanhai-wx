import Common from '$/common'
import { loginForToken } from 'modules/tokenManager/getToken'

App({
  onLaunch() {
    this.globalData.common = new Common()
    // 初始化注册
    initRegister()
  },
  globalData: {
    common: null,
  }
})

async function initRegister() {
  const keys = ['accessToken', 'expireAt', 'nickName', 'openId', 'quals', 'refreshToken' ,'id'];
  for (const key of keys) {
    const value = wx.getStorageSync(key);
    if (!value) {
      await loginForToken()
    }
  }
} 
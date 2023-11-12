import Common from '$/utils/common'
import { loginForToken } from 'modules/tokenManager/getToken'
import { user } from "$/stores/user-store"
App({
  onLaunch() {
    this.globalData.common = new Common()
    // 初始化注册"
    initRegister()
    // 更新用户信息
    user.updateUserInfo()
  },
  globalData: {
    common: null,
  }
})

async function initRegister() {
  const keys = ['accessToken', 'expireAt', 'nickName', 'openId', 'quals', 'refreshToken', 'id'];
  for (const key of keys) {
    const value = wx.getStorageSync(key);
    if (!value) {
      await loginForToken()
    }
  }
} 
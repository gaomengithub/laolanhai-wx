import { setStorage, getRefreshToken } from './tokenHandler'
const BASE_URL = "https://api.obabyball.com"
export function loginForToken() {
  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        if (res.code) {
          wx.request({
            url: BASE_URL + '/user/login',
            data: {
              code: res.code
            },
            success(res) {
              if (res.statusCode == "200") {
                setStorage(res.data)
                resolve(res.data)
              } else {
                reject(res)
              }
            },
            fail(e) {
              console.log("弹窗" + e)
              // reject(e)
            }
          })
        } else {
          console.log("弹窗，获取userCode错误")
        }
      }
    })
  })


}

export function updateAccessToken() {
  const refreshToken = getRefreshToken()
  wx.request({
    url: BASE_URL + '/user/refreshAccessToken',
    method: 'POST',
    data: {
      refreshToken: refreshToken
    },
    success(res) {
      if (res.statusCode == "200") {
        setStorage(res.data)
      }
      if (res.statusCode == "401") {
        loginForToken()
      }
    },
    fail(e) {
      console.log("刷新失败" + e)
    }
  })
}

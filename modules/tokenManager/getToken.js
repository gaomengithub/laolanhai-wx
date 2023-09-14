import { setStorage, getRefreshToken } from './tokenHandler'
const BASE_URL = "https://api.obabyball.com"
var log = require('../../utils/log')
let loginPromise = null;
export function loginForToken() {
  if (loginPromise) {
    return loginPromise;
  }
  loginPromise = new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        wx.request({
          url: BASE_URL + '/user/login',
          data: {
            code: res.code
          },
          success(res) {
            if (res.statusCode == "200") {
              resolve(res.data)
            } else {
              reject(res)
            }
          },
          fail(e) {
            wx.showModal({
              title: '错误',
              content: '网络连接错误',
              showCancel: false,
              complete: (res) => {
                if (res.confirm) {

                }
              }
            })
            log.error(JSON.stringify(e))
          }
        })

      },
      fail(e) {
        wx.showModal({
          title: '错误',
          content: '获取用户code失败',
          showCancel: false,
          complete: (res) => {
            if (res.confirm) {

            }
          }
        })
        log.error(JSON.stringify(e))
      },
      complete() {
        loginPromise = null
      }
    })
  })
  return loginPromise
}
//也用来刷新缓存
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
        loginForToken().then(res => {
          setStorage(res)
        })
      }
    },
    fail(e) {
      wx.showModal({
        title: '错误',
        content: '网络连接错误',
        showCancel: false,
        complete: (res) => {
          if (res.confirm) {

          }
        }
      })
      log.error(JSON.stringify(e))
    },
    complete() {

    }
  })
}

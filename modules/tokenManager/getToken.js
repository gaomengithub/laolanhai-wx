import { setStorage, clearStorage, getRefreshToken } from './tokenHandler'
const BASE_URL = "https://api.obabyball.com"
var log = require('../../utils/log')

let loginPromise = null

export function loginForToken() {
  if (loginPromise) {
    return loginPromise;
  }
  loginPromise = new Promise((resolve,reject) => {
    wx.login({
      success(res) {
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
              clearStorage()
              reject(res)
              wx.showModal({
                title: '错误',
                content: '非法的code',
                showCancel: false,
                complete: (res) => {
                  if (res.confirm) {

                  }
                }
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

let updatePromise = null

export function updateAccessToken() {
  if (updatePromise) {
    return updatePromise
  }
  updatePromise = new Promise((resolve, reject) => {
    const refreshToken = getRefreshToken()
    wx.request({
      url: BASE_URL + '/user/refreshAccessToken',
      method: 'POST',
      data: {
        refreshToken: refreshToken
      },
      success: async (res) => {
        if (res.statusCode == "200") {
          setStorage(res.data)
          resolve(res.data)
        } else if (res.statusCode == "401") {
          await loginForToken()
        } else {
          clearStorage()
          reject(res)
          wx.showModal({
            title: '错误',
            content: '服务器错误',
            showCancel: false,
            complete: (res) => {
              if (res.confirm) {

              }
            }
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
  })
  return updatePromise
}

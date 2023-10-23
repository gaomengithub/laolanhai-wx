import { getAvailableAccessToken } from '../modules/tokenManager/tokenToken'

var log = require('./log.js')
const BASE_URL = "https://api.obabyball.com"

export function request_(obj, retry = 0, force = false) {
  return new Promise(async function (resolve, reject) {
    const accessToken = await getAvailableAccessToken(force)
    requestWithToken(obj, accessToken, retry).then(resolve).catch(reject);
  });
}

function requestWithToken(obj, accessToken, retry) {
  return new Promise(function (resolve, reject) {
    var data = obj.data || {};
    var contentType = obj.contentType || 'application/json';
    var method = obj.method || 'GET';
    wx.request({
      url: BASE_URL + obj.url,
      data: data,
      method: method,
      header: {
        'Content-Type': contentType,
        'Authorization': 'Bearer ' + accessToken
      },
      success: function (res) {
        if (res.statusCode == "200") {
          resolve(res.data)
        }
        if (res.statusCode == "401") {
          if (retry < 2) {
            setTimeout(() => {
              request_(obj, retry + 1, true)
                .then(res => resolve(res))
                .catch(err => reject(err))
            }, 1000)
          } else {
            log.error('重试超过3次')
          }
        }
        if (res.statusCode == "400") {
          reject(res)
        }
      },
      fail: function (err) {
        wx.showModal({
          title: '错误',
          content: '请求出错，请检查网络连接后重试',
          showCancel: false,
          complete: (res) => {
            if (res.confirm) {

            }
          }
        })

        log.error(JSON.stringify(err))
      },
      complete: function () {
      }
    });
  });
}





import { getAvailableAccessToken } from '../modules/tokenManager/tokenToken'
import { handleErr } from "./msgHandler"

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
    wx.showLoading({ title: '请等待', mask:true})
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
        else if (res.statusCode == "401") {
          let retryTimeout = null
          if (retry < 2) {
            retryTimeout = setTimeout(() => {
              request_(obj, retry + 1, true)
                .then(() => clearTimeout(retryTimeout))
                .catch(() => clearTimeout(retryTimeout))
            }, 1000)
          } else {
            reject(new Error('重试超过最大次数'))
            handleErr("获取token的重试次数超过最大值")
          }
        } else {
          reject(res)
        }
      },
      fail: function (err) {
        handleErr("请求出错，请检查网络连接后重试")
      },
      complete: function () {
        wx.hideLoading()
      }
    });
  });
}





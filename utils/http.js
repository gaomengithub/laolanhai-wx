import { getAvailableAccessToken } from '../modules/tokenManager/tokenToken'
import { BASE_URL } from './global'

export function request(obj, retry = 0, force = false) {
  return new Promise(async function (resolve, reject) {
    // 获取token
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
          resolve(res)
        }
        if (res.statusCode == "401") {
          //如果是401则重新请求。约定401是鉴权失败，需要考虑重试次数。
          if (retry < 2) {  // 可以根据需求定义重试次数
            setTimeout(() => {
              request(obj, retry + 1, true).then(res => resolve(res))
                .catch(err => reject(err));
            }, 1000)
          } else {
            console.log("超过重试次数")
          }
        }
        if (res.statusCode == "400") {
          reject(res)
        }
      },
      fail: function (err) {
        reject(err)
      },
      complete: function () {
      }
    });
  });
}





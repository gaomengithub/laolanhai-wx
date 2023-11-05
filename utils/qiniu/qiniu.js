import { getUploadToken } from '../api'
import { handleErr } from "../../modules/msgHandler"
const qiniuUploader = require("./qiniuUploader");

let inited = false
// 初始化七牛云相关配置
function initQiniu() {
  var options = {
    region: 'ECN',
    // uptoken: token,
    domain: 'https://store.obabyball.com',
    shouldUseQiniuFileName: true
  };
  qiniuUploader.init(options);
  inited = true
}


export function uploadImgWithToken(path) {
  return new Promise(async function (resolve, reject) {
    const data = await getUploadToken()
    if (!inited) {
      initQiniu()
    }
    qiniuUploader.init({ uptoken: data.message })
    qiniuUploader.upload(path, (res) => {
      resolve(res)
    }), (error) => {
      reject(error)
    }
  })
}

export function compressUploadImg(params) {
  return new Promise(async (resolve, reject) => {
    wx.compressImage({
      src: params,
      quality: 10,
      success: function (res) {
        uploadImgWithToken(res.tempFilePath).then(res => {resolve(res.key) })
      },
      fail: (e) => {
        handleErr("压缩图片失败")
        reject(e);
      }
    })
  })
}
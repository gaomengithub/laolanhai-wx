import { getUploadToken } from './api'
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
    const res = await getUploadToken()
    if (!inited) {
      initQiniu()
    }
    qiniuUploader.init({ uptoken: res.data.message })
    qiniuUploader.upload(path, (res) => {
      resolve(res)
    }), (error) => {
      reject(error)
    }
  })
}
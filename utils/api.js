import { request } from "./http"

export function getMatchList() {
  let obj = {
    url: '/match/list',
    method: 'POST',
    data: {
      city: "",
      match_type: 3,
      page_size: 10,
      page_token: "",
      team_id: "",
      user_id: ""
    }
  }
  return request(obj)
}


export async function createMatch(data) {
  let obj = {
    url: '/match/create',
    method: 'POST',
    data: data
  }
  return await request(obj)
}

export function afterRead(event){
  const { file } = event.detail;
  // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
  wx.uploadFile({
    url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
    filePath: file.url,
    name: 'file',
    formData: { user: 'test' },
    success(res) {
      // 上传完成需要更新 fileList
      const { fileList = [] } = this.data;
      fileList.push({ ...file, url: res.data });
      this.setData({ fileList });
    },
  });
}


export function uploadImg() {
  var that = this
  wx.chooseMedia({
    count: 3,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: function (res) {
      console.log(res.tempFiles[0])
      // wx.uploadFile({
      //   url: '服务器url',
      //   filePath: tempFilePaths[0],
      //   name: 'file', //这个根据个人的后端来定，我个人后端需要的是这个，如果不是改成你所需要的
      //   header: {
      //     'content-type': 'multipart/form-data'
      //   },
      //   formData: {
      //     'user': 'test' //你的额外参数
      //   },
      //   success: function (res) {
      //     var data = res.data
      //     //do something
      //   }
      // })
    }
  })
}
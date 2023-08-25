import { createMatch, uploadImage } from '../../utils/api'
import WxValidate from '../../utils/WxValidate'
import { options } from '../../utils/area'
import { iconUrls } from '../../utils/urls'
import { getUploadToken } from '../../utils/api'


const qiniuUploader = require("../../utils/qiniuUploader");
// index.js

// 初始化七牛云相关配置
function initQiniu(token) {
  var options = {
    region: 'ECN',
    uptoken: token,
    domain: 'https://store.obabyball.com',
    shouldUseQiniuFileName: false
  };
  qiniuUploader.init(options);
}

const app = getApp()
let fileList = []

Page({
  data: {
    options: options,
    type: 3,
    navTitle: "发布",
    autoSize: { minHeight: 50 },
    formattedDate: "",
    iconUrls: {
      date: iconUrls.addCalendar,
      startTime: iconUrls.addStartTime,
      endTime: iconUrls.addEndTime,
      startAge: iconUrls.addStartAge,
      endAge: iconUrls.addEndAge,
      cost: iconUrls.addCost,
      upload: iconUrls.addUpload
    },
    //form data
    name: "",
    desc: "",
    currDate: '',
    startTime: "",
    endTime: "",
    currArea: "",
    address: "",
    joinNum: "",
    startAge: "",
    endAge: "",
    currCost: "免费",
    // 页面控制
    minHour: 10,
    maxHour: 20,
    showStartTimePicker: false,
    showEndTimePicker: false,
    showCalendar: false,
    showMatchTpyePicker: false,
    showAreaCascader: false,
    showCostAction: false,
    costActions: [{ name: "免费" }, { name: "约10元" }, { name: "约20元" }, { name: "约30元" }],
    navBarHeight: app.globalData.navBarHeight,
    //上传
    fileList: [],
  },

  onLoad(options) {
    this.initValidate();
    try {
      this.setData({
        type: options.type
      })
    } catch (e) {
      console.log("获取页面参数错误")
    }
  },
  onDisplay(e) {
    const show = e.currentTarget.dataset.show
    this.setData({
      [show]: true
    })
  },
  onClose(e) {
    const show = e.currentTarget.dataset.show
    this.setData({
      [show]: false
    })
  },
  onInput(e) {
    const key = e.currentTarget.dataset.key
    this.setData({
      [key]: e.detail
    })
  },
  onConfirm(e) {
    const key = e.currentTarget.dataset.key
    const show = e.currentTarget.dataset.show
    let val = e.detail
    if (key == "currDate") {
      val = this.formatDate(e.detail)
    } else if (key == "currCost") {
      val = e.detail.name
    }
    this.setData({
      [show]: false,
      [key]: val
    })
  },
  onChange(e) {
    const key = e.currentTarget.dataset.key
    this.setData({
      [key]: e.detail
    })
  },
  onFinishAreaCascader(e) {
    const { selectedOptions } = e.detail
    const fieldValue = selectedOptions.map((option) => option.text || option.name).join('/');
    this.setData({
      showAreaCascader: false,
      currArea: fieldValue
    })
  },

  formatDate(date) {
    date = new Date(date);
    let year = date.getFullYear(); // 获取年份
    let month = date.getMonth() + 1; // 获取月份，月份从0开始所以加1
    let day = date.getDate(); // 获取日期
    let formattedDate = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
    this.setData({
      formattedDate: formattedDate
    })
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  },


  onAfterRead(event) {
    const that = this
    const { file } = event.detail;
    wx.compressImage({
      src: file.tempFilePath,
      quality: 50,
      success(res) {
        var filePath = res.tempFilePath;
        getUploadToken().then(res => {
          initQiniu(res.data.message);
          qiniuUploader.upload(filePath, (res) => {
            fileList.push({ url: filePath})
            that.setData({
              fileList: fileList
            })
          }, (error) => {
            console.error('error: ' + JSON.stringify(error));
          },
            null,
            (progress) => {
              that.setData({
                'imageProgress': progress
              });
              console.log('上传进度', progress.progress);
              console.log('已经上传的数据长度', progress.totalBytesSent);
              console.log('预期需要上传的数据总长度', progress.totalBytesExpectedToSend);
            },
          );
        })
      }
    })
  },
  onCreateBtn() {
    //校验表单
    const formData = { name: this.data.name, desc: this.data.desc, joinNum: this.data.joinNum, date: this.data.currDate, currArea: this.data.currArea, address: this.data.address, startAge: this.data.startAge, endAge: this.data.endAge }
    if (!this.WxValidate.checkForm(formData)) {
      const error = this.WxValidate.errorList[0];
      wx.showModal({
        content: error.msg,
        showCancel: false
      })
      return false;
    }

    let data = {
      age_group_start: parseInt(this.data.startAge),
      age_group_end: parseInt(this.data.endAge),
      attachments: this.data.fileList[1].url,
      banner_attachments: this.data.fileList[0].url,
      description: this.data.desc,
      end_time: this.data.formattedDate + 'T' + this.data.endTime + ':00Z',
      start_time: this.data.formattedDate + 'T' + this.data.startTime + ':00Z',
      join_num: parseInt(this.data.joinNum),
      location: this.data.currArea + this.data.address,
      match_type: parseInt(this.data.type),
      name: this.data.name,
      // price: this.data.currCost
      // organizer: "",
    }
    createMatch(data).then(res => {
      if (res.statusCode == "200") {
        wx.showModal({
          title: '创建成功',
          showCancel: false,
          complete: (res) => {
            if (res.confirm) {
              wx.switchTab({
                url: '/pages/home/index',
              })
            }
          }
        })
      }
    }).catch(e => {
      console.log(e)
    })
  },



  initValidate() {
    const rules = {
      name: {
        required: true
      },
      desc: {
        required: true
      },
      date: {
        required: true
      },
      currArea: {
        required: true,
      },
      address: {
        required: true,
      },
      joinNum: {
        required: true,
      },
      startAge: {
        required: true
      },
      endAge: {
        required: true
      }
    }
    const messages = {
      name: {
        required: '标题不能为空'
      },
      desc: {
        required: '描述不能为空'
      },
      date: {
        required: '日期不能为空'
      },
      currArea: {
        required: '地区不能为空',
      },
      joinNum: {
        required: '参加数量不能为空',
      },
      address: {
        required: '详细地址不能为空',
      },
      startAge: {
        required: '年龄上限不能为空'
      },
      endAge: {
        required: '年龄下限不能为空'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },



})
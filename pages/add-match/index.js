import { createMatch } from '../../utils/api'
import WxValidate from '../../utils/WxValidate'
import { options } from '../../utils/pca-code'
import { iconUrls } from '../../utils/urls'
import { getDifferenceInMinute } from '../../utils/util'
import { addMatchMessages, addMatchRules } from '../../utils/validate-set'
import { uploadImgWithToken } from '../../utils/qiniu'



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
    this.WxValidate = new WxValidate(addMatchRules, addMatchMessages)
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
    const _this = this
    const { file } = event.detail;
    wx.compressImage({
      src: file.tempFilePath,
      quality: 10,
      success(res) {
        var filePath = res.tempFilePath;
        uploadImgWithToken(filePath).then(url => {
          fileList.push({ url: filePath })
          _this.setData({
            fileList
          })
        }).catch(e=>{
          console.error('error: ' + JSON.stringify(e));
        })
      }
    })
  },
  onCreateBtn() {
    //校验表单
    const formData = {
      name: this.data.name,
      desc: this.data.desc,
      joinNum: this.data.joinNum,
      date: this.data.currDate,
      currArea: this.data.currArea,
      address: this.data.address,
      startAge: this.data.startAge,
      endAge: this.data.endAge,
      timeDiff: getDifferenceInMinute(this.data.endTime, this.data.startTime),
      ageDiff: this.data.startAge - this.data.endAge,
      imgCount: this.data.fileList.length
    }
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
})
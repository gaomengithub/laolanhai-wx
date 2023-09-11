import { createMatch, getMatchDesc, updateMatch } from '$/api'
import WxValidate from '$/WxValidate'
import { options } from '$/pca-code'
import { iconUrls } from '$/urls'
import { getDifferenceInMinute, formatDate, splitDateTime, revertQiniuKey } from '$/util'
import { addMatchMessages, addMatchRules } from '$/validate-set'
import { uploadImgWithToken } from '$/qiniu'

Page({
  data: {
    options: options,
    type: 3,
    isNew: true,
    navTitle: "发布",
    matchID: "",
    autoSize: { minHeight: 80 },
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
    date: "",
    startTime: "",
    endTime: "",
    region: "",
    address: "",
    joinNum: "",
    startAge: "",
    endAge: "",
    cost: "免费",
    // 页面控制
    minHour: 8,
    maxHour: 18,
    fieldNames: {
      text: 'text',
      value: 'text',
      children: 'children',
    },
    showStartTimePicker: false,
    showEndTimePicker: false,
    showCalendar: false,
    showMatchTpyePicker: false,
    showAreaCascader: false,
    showCostAction: false,
    costActions: [{ name: "免费" }, { name: "约10元" }, { name: "约20元" }, { name: "约30元" }],
    navBarHeight: getApp().globalData.navBarHeight,
    //上传
    fileList: [],
    showFileList: []
  },
  onShow() {

  },
  onLoad(options) {
    this.WxValidate = new WxValidate(addMatchRules, addMatchMessages)
    //判断是否新建
    const pageClass = options.class
    if (pageClass == "create") return
    if (pageClass == "modify") {
      const matchID = options.matchID
      const type = options.type
      this.setData({
        type,
        matchID,
        isNew: false
      })
      getMatchDesc(matchID).then(res => {
        this.setData({
          name: res.data.name,
          desc: res.data.description,
          joinNum: res.data.join_num,
          startAge: res.data.age_group_start,
          endAge: res.data.age_group_end,
          fileList: [
            { url: revertQiniuKey(res.data.banner_attachments) },
            { url: revertQiniuKey(res.data.attachments) }
          ],
          showFileList: [
            { url: res.data.banner_attachments, isImage: true, },
            { url: res.data.attachments, isImage: true, }
          ],
          date: splitDateTime(res.data.start_time)[0],
          startTime: splitDateTime(res.data.start_time)[1],
          endTime: splitDateTime(res.data.end_time)[1],
          region: res.data.location.split("||")[0],
          address: res.data.location.split("||")[1],
          cost: ["免费", "约10元", "约20元", "约30元"][res.data.price[0]]
        })
      })
    }

  },
  deleteImg(e) {
    const fileList = this.data.fileList
    const showFileList = this.data.showFileList
    fileList.splice(e.detail.index, 1)
    showFileList.splice(e.detail.index, 1)
    this.setData({
      fileList,
      showFileList
    })
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
    if (key == "date") {
      val = formatDate(e.detail)
    } else if (key == "cost") {
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
    const val = selectedOptions.map((option) => option.text).join('/');
    this.setData({
      showAreaCascader: false,
      region: val
    })
  },

  onAfterRead(event) {
    wx.showLoading({
      title: '正在上传图片...',
      mask: true
    })
    let fileList = this.data.fileList
    let showFileList = this.data.showFileList
    const _this = this
    const { file } = event.detail;
    wx.compressImage({
      src: file.tempFilePath,
      quality: 10,
      success(res) {
        const filePath = res.tempFilePath;
        uploadImgWithToken(filePath).then(url => {
          console.log(filePath)
          showFileList.push({ url: filePath })
          fileList.push({ url: url.key })
          _this.setData({
            fileList,
            showFileList
          })
        }).catch(e => {
          console.error('error: ' + JSON.stringify(e));
        })
      }
    })
    wx.hideLoading()
  },
  onCreateBtn() {
    //校验表单
    const formData = {
      name: this.data.name,
      desc: this.data.desc,
      joinNum: this.data.joinNum,
      date: this.data.date,
      region: this.data.region,
      address: this.data.address,
      startAge: this.data.startAge,
      endAge: this.data.endAge,
      timeDiff: getDifferenceInMinute(this.data.endTime, this.data.startTime),
      ageDiff: this.data.endAge - this.data.startAge,
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
    wx.showLoading({
      title: '请等待',
      mask: true
    })
    let data = {
      age_group_start: parseInt(this.data.startAge),
      age_group_end: parseInt(this.data.endAge),
      attachments: [this.data.fileList[1].url],
      banner_attachments: this.data.fileList[0].url,
      description: this.data.desc,
      end_time: this.data.date + 'T' + this.data.endTime + ':00Z',
      start_time: this.data.date + 'T' + this.data.startTime + ':00Z',
      join_num: parseInt(this.data.joinNum),
      location: this.data.region + "||" + this.data.address,
      match_type: parseInt(this.data.type),
      name: this.data.name,
      price: parseInt(this.data.cost) == NaN ? 0 : parseInt(this.data.cost)
      // organizer: "",
    }
    if (this.data.isNew) {
      createMatch(data).then(() => {
        wx.showModal({
          title: '创建成功',
          content:"创建成功，点击确定返回",
          showCancel: false,
          complete: (res) => {
            if (res.confirm) {
              wx.switchTab({
                url: '/pages/home/index',
              })
            }
          }
        })
      }).catch(e => {
        console.log(e)
      })
    } else {
      data['id'] = this.data.matchID
      updateMatch(data).then(() => {
        wx.showModal({
          title: '修改成功',
          showCancel: false,
          complete: (res) => {
            if (res.confirm) {
              wx.switchTab({
                url: '/pages/home/index',
              })
            }
          }
        })
      })
    }
    wx.hideLoading()
  },
})
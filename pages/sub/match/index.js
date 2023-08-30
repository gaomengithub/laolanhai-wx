import { createMatch, getMatchDesc, getDownloadToken, updateMatch } from '../../../utils/api'
import WxValidate from '../../../utils/WxValidate'
import { options } from '../../../utils/pca-code'
import { iconUrls } from '../../../utils/urls'
import { getDifferenceInMinute, formatDate, splitDateTime } from '../../../utils/util'
import { addMatchMessages, addMatchRules } from '../../../utils/validate-set'
import { uploadImgWithToken } from '../../../utils/qiniu'

const app = getApp()
let fileList = []
let showFileList = []

Page({
  data: {
    options: options,
    type: 3,
    isNew: true,
    matchID:"",
    navTitle: "发布",
    autoSize: { minHeight: 50 },
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
    currDate: "",
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
    showFileList: []
  },
  onShow(){
    fileList = []
    showFileList = []
  },
  onLoad(options) {
    this.WxValidate = new WxValidate(addMatchRules, addMatchMessages)
    if ( options.type != undefined && options.new !=undefined ){
      try {
        this.setData({
          type: options.type,
          isNew: options.new == "y"
        })
      } catch (e) {
        this.setData({
          type: 3,
          isNew: true
        })
      }
    }

    // 修改比赛信息
    if (!this.data.isNew && options.matchID.length > 0) {
      this.setData({
        matchID:options.matchID
      })
      getMatchDesc(matchID).then(res => {
        getDownloadToken({ file_names: [res.data.banner_attachments, res.data.attachments] }).then(token => {
          this.setData({
            name: res.data.name,
            desc: res.data.description,
            joinNum: res.data.join_num,
            startAge: res.data.age_group_start,
            endAge: res.data.age_group_end,
            fileList: token.data,
            currDate: splitDateTime(res.data.start_time)[0],
            startTime: splitDateTime(res.data.start_time)[1],
            endTime: splitDateTime(res.data.end_time)[1],
            currArea: res.data.location.split("||")[0],
            address: res.data.location.split("||")[1],
            currCost: res.data.price
          })
        })
      })
    }
  },
  deleteImg(e){
    fileList.pop(e.detail.index)
    showFileList.pop(e.detail.index)
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
    if (key == "currDate") {
      val = formatDate(e.detail)
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

  onAfterRead(event) {
    const _this = this
    const { file } = event.detail;
    wx.compressImage({
      src: file.tempFilePath,
      quality: 10,
      success(res) {
        var filePath = res.tempFilePath;
        uploadImgWithToken(filePath).then(url => {
          showFileList.push({ url: filePath })
          fileList.push({ url: url.key })
          _this.setData({
            fileList,
            showFileList
          })
          console.log(_this.data.fileList)
          console.log(_this.data.showFileList)
        }).catch(e => {
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
      ageDiff:  this.data.endAge - this.data.startAge,
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
      end_time: this.data.currDate + 'T' + this.data.endTime + ':00Z',
      start_time: this.data.currDate + 'T' + this.data.startTime + ':00Z',
      join_num: parseInt(this.data.joinNum),
      location: this.data.currArea + "||" + this.data.address,
      match_type: parseInt(this.data.type),
      name: this.data.name,
      // price: this.data.currCost
      // organizer: "",
    }
    if (this.data.isNew) {
      createMatch(data).then(res => {
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
      }).catch(e => {
        console.log(e)
      })
    } else {
      data['id'] = this.data.matchID
      updateMatch(data).then(() => {
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
      })
    }
  },
})
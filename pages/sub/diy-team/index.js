import { iconUrls } from '$/urls'
import { options } from '$/pca-code'
import { addTeamMessages, addTeamRules } from '$/validate-set'
import WxValidate from '$/WxValidate'
import { createTeam } from '$/api'
import { uploadImgWithToken } from '$/qiniu'
const app = getApp()
let fileList = []
let showFileList = []
Page({
  data: {
    options: options,
    fieldNames: {
      text: 'text',
      value: 'text',
      children: 'children',
    },
    navTitle: "创建球队",
    autoSize: { minHeight: 100 },
    name: "",
    intro: "",
    currCity: "",
    location: "",
    fileList: [],
    showFileList:[],
    showAreaCascader: false,
    iconUrls: {
      upload: iconUrls.addTeamUpload,
      name: iconUrls.addTeamName,
      intro: iconUrls.addTeamIntro,
      location: iconUrls.addTeamLocation,
      address: iconUrls.addTeamAddress
    },
    // navBarHeight: app.globalData.navBarHeight,
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
  onFinishAreaCascader(e) {
    const { selectedOptions } = e.detail
    const val = selectedOptions.map((option) => option.text).join('/');
    this.setData({
      showAreaCascader: false,
      currCity: val
    })
  },
  onLoad(options) {
    this.WxValidate = new WxValidate(addTeamRules, addTeamMessages)
  },
  onCreateBtn() {
    //校验表单
    const formData = {
      name: this.data.name,
      intro: this.data.intro,
      city: this.data.currCity,
      location: this.data.location,
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
      city: this.data.currCity,
      desc: this.data.intro,
      logo: fileList[0],
      name: this.data.name,
      region: this.data.location,
      founded: new Date()
    }
    createTeam(data).then(res => {
      if (res.statusCode == "200") {
        wx.showModal({
          title: '创建成功',
          content:'球队创建成功，您自动成为球队队长',
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
          fileList.push(url.key)
          _this.setData({
            showFileList,
            fileList
          })
        }).catch(e=>{
          console.error('error: ' + JSON.stringify(e));
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
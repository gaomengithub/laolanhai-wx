import { iconUrls } from '$/urls'
import { options } from '$/pca-code'
import { addTeamMessages, addTeamRules } from '$/validate-set'
import WxValidate from '$/WxValidate'
import { createTeam, getTeamDesc, updateTeam } from '$/api'
import { uploadImgWithToken } from '$/qiniu'

let fileList = []
let showFileList = []
Page({
  data: {
    type: "",
    teamID: "",
    options: options,
    fieldNames: {
      text: 'text',
      value: 'text',
      children: 'children',
    },
    navTitle: "创建/修改球队",
    autoSize: { minHeight: 85 },
    name: "",
    intro: "",
    currCity: "",
    location: "",
    memberNum: "",
    fileList: [],
    showFileList: [],
    showAreaCascader: false,
    iconUrls: {
      upload: iconUrls.addTeamUpload,
      name: iconUrls.addTeamName,
      intro: iconUrls.addTeamIntro,
      location: iconUrls.addTeamLocation,
      address: iconUrls.addTeamAddress,
      member: iconUrls.member
    },
    // navBarHeight: app.globalData.navBarHeight,
  },
  onDisplay(e) {
    const show = e.currentTarget.dataset.show
    this.setData({
      [show]: true
    })
  },
  onDelete(e) {
    const fileList = this.data.fileList
    const showFileList = this.data.showFileList
    fileList.splice(e.detail.index, 1)
    showFileList.splice(e.detail.index, 1)
    this.setData({
      fileList,
      showFileList
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

    const teamID = options.teamID
    const type = options.type
    this.setData({
      type,
      teamID
    })
    if (teamID != undefined) {
      getTeamDesc(teamID).then(res => {
        this.setData({
          showFileList: [{ url: res.data.logo, isImage: true, }],
          currCity: res.data.city,
          fileList: [res.data.logoKey],
          location: res.data.region,
          intro: res.data.desc,
          name: res.data.name,
          memberNum: res.data.number
        })
      })
    }
  },
  onBtnClick() {
    //校验表单
    const formData = {
      name: this.data.name,
      intro: this.data.intro,
      city: this.data.currCity,
      location: this.data.location,
      imgCount: this.data.fileList.length,
      memberNum: this.data.memberNum,
    }
    if (!this.WxValidate.checkForm(formData)) {
      const error = this.WxValidate.errorList[0];
      wx.showModal({
        content: error.msg,
        showCancel: false
      })
      return false;
    }

    let teamData = {
      city: this.data.currCity,
      desc: this.data.intro,
      logo: fileList[0],
      name: this.data.name,
      region: this.data.location,
      number: parseInt(this.data.memberNum),
      founded: new Date()
    }
    if (this.data.type == 'create') {
      createTeam(teamData).then(() => {
        wx.showModal({
          title: '创建成功',
          content: '球队创建成功，您自动成为球队队长，并自动开启招募',
          showCancel: false,
          complete: (res) => {
            if (res.confirm) {
              wx.navigateBack({
                success: () => {
                  getApp().globalData.refreshTeamList()
                }
              })
            }
          }
        })
      })
    }
    if ((this.data.type == 'modify')) {
      teamData["id"] = this.data.teamID
      updateTeam(teamData).then(() => {
        wx.showModal({
          title: '修改成功',
          content: '修改球队信息成功，点击确定返回',
          showCancel: false,
          complete: (res) => {
            if (res.confirm) {
              wx.navigateBack({
                success: () => {
                  getApp().globalData.refreshTeamList()
                }
              })
            }
          }
        })
      })
    }

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
        }).catch(e => {
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
import { iconUrls } from '../../utils/urls'
import { options } from '../../utils/pca-code'
const app = getApp()
Page({
  data: {
    options:options,
    navTitle: "创建球队",
    autoSize: { minHeight: 100 },
    name: "",
    desc: "",
    currCity: "",
    address: "",
    fileList:[],
    currCity:"",
    showAreaCascader:false,
    iconUrls: {
      upload: iconUrls.addTeamUpload,
      name: iconUrls.addTeamName,
      intro: iconUrls.addTeamIntro,
      location: iconUrls.addTeamLocation,
      address: iconUrls.addTeamAddress
    },
    navBarHeight: app.globalData.navBarHeight,
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
    const fieldValue = selectedOptions.map((option) => option.text || option.name).join('/');
    this.setData({
      showAreaCascader: false,
      currCity: fieldValue
    })
  },
  onLoad(options) {

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
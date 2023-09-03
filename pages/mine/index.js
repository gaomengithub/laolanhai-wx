import { imgUrls, iconUrls } from '$/urls'
import { getUserInfoByID ,getMatchApprovalList} from '$/api'
Page({
  data: {
    nickName: "",
    lightImg: imgUrls.mineLightImg,
    teamIcon: iconUrls.mineTeam,
    applyIcon: iconUrls.mineApply,
    inIcon: iconUrls.mineIn,
    showPopup: false,
    closeIcon: iconUrls.barClose,
    avatarUrl: ""
  },
  onClosePopup() {
    this.setData({
      showPopup: false
    })
  },
  showPopup() {
    this.setData({
      showPopup: true
    })
  },

  onLoad(options) {
    const id = wx.getStorageSync('id')
    getUserInfoByID(id).then(res => {
      console.log(res)
      this.setData({
        nickName: res.data.nickName,
        avatarUrl: res.data.avatar
      })
    })
    getMatchApprovalList().then(res=>{
      console.log(res)
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
    //tabbar
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 4
      })
    }
  },
  onApply() {

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
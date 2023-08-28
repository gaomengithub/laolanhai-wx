import { imgUrls, iconUrls } from '../../utils/urls'
import { getUserInfoByID } from '../../utils/api'
Page({
  data: {
    nickName: "",
    lightImg: imgUrls.mineLightImg,
    teamIcon: iconUrls.mineTeam,
    applyIcon: iconUrls.mineApply,
    inIcon: iconUrls.mineIn,
    showPopup:false,
    closeIcon:iconUrls.barClose,
    avatarUrl:"https://openstore.obabyball.com/ui_v1/icon/mine-default-avatar.svg"
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const id = wx.getStorageSync('id')
    getUserInfoByID(id).then(res=>{
      this.setData({
        nickName:res.data.nickName
      })
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
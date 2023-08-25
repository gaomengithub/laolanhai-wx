import { getMatchDesc, joinMatch } from '../../utils/api'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTitle: "老蓝孩俱乐部",
    matchID: "",
    match: {},
    navBarHeight: app.globalData.navBarHeight,

  },
  onJoinBtn() {
    if (this.data.matchID != "" || this.data.matchID != null) {
      joinMatch(this.data.matchID).then(res => {
        console.log(res)
        wx.showToast({
          title: '报名成功',
          icon: 'success',
          duration: 2000,
          success() {
            setTimeout(() => {
              wx.navigateBack()
            }, 2000)
          }
        })
      }).catch(e => {
        console.log("请求出错")
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    try {
      this.setData({
        matchID: options.matchID
      })
    } catch (e) {
      console.log("获取比赛ID失败")
    }
    getMatchDesc(options.matchID).then(res => {
      this.setData({
        match: res.data
      })
    }).catch(e => {
      console.log(e)
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
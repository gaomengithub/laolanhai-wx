import { getMatchDesc, joinMatch } from '$/api'
import { iconUrls } from '$/urls'
const app = getApp()
Page({
  data: {
    navTitle: "老蓝孩俱乐部",
    matchID: "",
    match: {},
    showDialog:false,
    dialogIconType:"success",
    dialogMsg:"报名成功",
    typeUrl: iconUrls.descUnofficialTag,
    clockUrl: iconUrls.descClock,
    locationUrl: iconUrls.descLocation,
    navBarHeight: app.globalData.navBarHeight,
  },
  onDialogConfirmBtn(){
    this.setData({
      showDialog:false,
    })
    wx.navigateBack()
  },
  onJoinBtn() {
    wx.showLoading({
      title: '请等待',
      mask:true,
    })
    if (this.data.matchID != "" || this.data.matchID != null) {
      joinMatch(this.data.matchID).then(() => {
        wx.hideLoading()
        this.setData({
          dialogIconType:"success",
          showDialog:true,
          dialogMsg:"报名成功"
        })
      }).catch(e => {
        console.log(e)
        if (e.statusCode == 400) {
          wx.hideLoading()
          this.setData({
            dialogIconType:"info",
            showDialog:true,
            dialogMsg:"您已经报过名，无需再报名"
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    try {
      this.setData({
        matchID: options.matchID,
        typeUrl: [iconUrls.descOfficialTag, iconUrls.descOfficialTag, iconUrls.descUnofficialTag][options.matchType - 1]
      })
    } catch (e) {
      console.log("获取比赛ID失败")
    }
    getMatchDesc(options.matchID).then(res => {
      res.data.start_time = res.data.start_time.replace(":00+08:00", "").replace("T", "  ")
      res.data.location = res.data.location.replace("||","  ")
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
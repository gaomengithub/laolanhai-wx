import { getTeamList, getTeamDesc } from '$/api'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTitle: "球队",
    navBarHeight: app.globalData.navBarHeight,
    teamList: [],
    teamCards: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (this.selectComponent("#team-card").data.auth) {
      let teamCards = []
      try {
        const quals = wx.getStorageSync('quals')
        const ls = quals.map(item => item.teamId).filter(item => item !== undefined)
        for (let item of ls) {
          getTeamDesc(item).then(res => {
            teamCards.push(res.data)
            this.setData({
              teamCards
            })
          })
        }
      } catch {

      }
    }
      getTeamList().then(res => {
        this.setData({
          teamList: res.data.items
        })
      }).catch(e => {
        console.log("获得队伍列表错误")
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

    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }


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

  },

})
import { getTeamList, getTeamDesc } from '$/api'
import routeInterceptor from '$/router'
import { iconUrls } from '$/urls'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrow: iconUrls.tabArrow,
    navTitle: "球队",
    navBarHeight: app.globalData.navBarHeight,
    teamList: [],
    teamCards: [],
    haveData: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadMyTeamList()
    this.loadTeamList()
  },
  loadTeamList() {
    getTeamList().then(res => {
      const filter = res.data.items.filter(item => !item.isMyTeam)
      if (filter.length > 0) {
        this.setData({
          teamList: filter,
          haveData: true
        })
      } else {
        this.setData({
          haveData: false
        })
      }
    }).catch(e => {
      console.log("获得队伍列表错误")
    })
  },
  loadMyTeamList() {
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
        console.log("加载我的球队数据失败")
      }
    }
  },
  ToTeamCreate() {
    const path = '/pages/sub/diy-team/index?type=create'
    routeInterceptor.navigateTo(path)
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
    this.loadMyTeamList()
    this.loadTeamList()
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
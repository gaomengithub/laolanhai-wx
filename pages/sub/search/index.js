import { searchAngthing } from '../../../utils/api'

// const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTitle: "搜索",
    value: "",
    // navBarHeight: app.globalData.navBarHeight,
    matches: [],
    teams: "",
    users: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },
  onClick() {
    if (this.data.value.length > 0) {
      searchAngthing(this.data.value).then(res => {
        this.setData({
          matches: res.data.matches == undefined ? [] : res.data.matches,
          teams: res.data.teams == undefined ? [] : res.data.teams,
          users: res.data.users == undefined ? [] :res.data.teams
        })
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请输入搜索的内容',
        showCancel: false,
        complete: (res) => {
          if (res.confirm) {

          }
        }
      })
    }
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
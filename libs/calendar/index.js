// libs/calendar/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTitle: "时间",
    radio: "",
    type: "multiple",
    navBarHeight: app.globalData.navBarHeight,
  },
  onChange(e) {
    const key = e.detail
    const date = new Date();
    var dates = [];
    for (let i = 0; i < key; i++) {
      date.setDate(date.getDate() + 1);
      dates.push(date.toISOString().substring(0, 10));
    }
    const calendar = this.selectComponent('.calendar');
    calendar.setData({
      currentDate: dates
    })
  },
  // 判断是否连续的函数
  isConsecutive(list) {
    for (let i = 1; i < list.length; i++) {
      // 如果时间戳相差不是一天，那就说明不是连续的
      if (list[i] - list[i - 1] !== 24 * 60 * 60 * 1000) {
        return false
      }
    }
    return true
  },
  // 将时间戳转为日期的函数
  formatDate(timestamp) {
    let date = new Date(timestamp)
    return `${date.getMonth() + 1}-${date.getDate()}`
  },

  onConfirm() {
    const calendar = this.selectComponent('.calendar');
    const currDate = calendar.data.currentDate
    let formatedDate = "" 
    if (this.isConsecutive(currDate)){
      formatedDate = `${this.formatDate(currDate[0])} - ${this.formatDate(currDate[currDate.length - 1])}`
    }else{
      formatedDate = currDate.map(timestamp => this.formatDate(timestamp)).join(', ')
    }
    app.globalData.currDate = formatedDate
    wx.navigateBack()

  },
  onReset() {
    const calendar = this.selectComponent('.calendar');
    calendar.reset()
  },
  /**
   * 生命周期函数--监听页面加载
   */
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
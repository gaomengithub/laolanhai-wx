import { getTeamList, getDownloadToken } from '../../utils/api'

const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTitle: "观赛",
    navBarHeight: app.globalData.navBarHeight,
    teamList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    getTeamList().then(res => {
      const imgUrls = res.data.items.map(item => item.logo)
      console.log(imgUrls)
      getDownloadToken({ file_names: imgUrls }).then(token => {
        console.log(token)
        for (let [index, item] of res.data.items.entries()) {
          item.logo = token.data[index]
        }
        this.setData({
          teamList: res.data.items
        })
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
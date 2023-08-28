import { searchAngthing, getDownloadToken } from '../../utils/api'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTitle: "搜索",
    value: "",
    navBarHeight: app.globalData.navBarHeight,
    matches: "",
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
    searchAngthing(this.data.value).then(res => {
      if (res.data.matches.lenght > 0) {
        const bannerAttachments = res.data.matches.map(item => 'tmp/' + item.banner_attachments.split("/tmp/")[1])
        getDownloadToken({ file_names: bannerAttachments }).then(token => {
          for (let [index, item] of res.data.matches.entries()) {
            item.banner_attachments = token.data[index] == undefined ? 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg' : token.data[index]
          }
          this.setData({
            matches: res.data.matches,
            // teams: res.data.teams,
            // users: res.data.users
          })
        })
      }
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
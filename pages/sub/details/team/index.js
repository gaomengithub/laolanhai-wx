import { getTeamDesc, joinTeam } from '$/api'
import { imgUrls } from '$/urls'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: {},
    active: 0,
    teamID: "",
    // showComments: false,
    comments: "",
    autosize: { minHeight: 50 },
    bgImg: imgUrls.detailTeamBgImg,
    navTitle: "球队详情",
  },
  onChange(e) {
    const active = e.currentTarget.dataset.active
    this.setData({
      active
    })
  },
  onJoinBtn() {
    wx.showModal({
      title: '填写申请',
      placeholderText: '输入想给队长的信息',
      editable: true,
      complete: (res) => {
        if (res.cancel) {

        }
        if (res.confirm) {
          joinTeam(this.data.items.id, res.content).then(() => {
            wx.showToast({
              title: '申请成功，等待队长审批',
              duration: 2000,
              mask: true,
              success: function () {
                setTimeout(function () {
                  wx.navigateBack()
                }, 2000)
              }
            })
          })
        }
      }
    })
  },
  loadTeamDesc(teamID) {
    getTeamDesc(teamID).then(res => {
      this.setData({
        items: res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    try {
      const teamID = options.id
      if (teamID != undefined) {
        this.loadTeamDesc(teamID)
        this.setData({
          teamID
        })
      }
    } catch (e) {
      console.log("获取id失败")
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
    this.loadTeamDesc(this.data.teamID)
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
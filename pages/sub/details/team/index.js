import { getTeamDesc,joinTeam,getTeamApprovalList} from '$/api'
import { imgUrls } from '$/urls'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: {},
    active: 0,
    showComments: false,
    comments: "",
    autosize: { minHeight: 50 },
    bgImg: imgUrls.detailTeamBgImg,
    navTitle: "球队详情",
    navBarHeight: getApp().globalData.navBarHeight,
  },
  onChange(e) {
    const active = e.currentTarget.dataset.active
    this.setData({
      active
    })
  },
  onJoinBtn() {
    this.setData({
      showComments: true
    })
  },
  onConfirmBtn() {
    if (this.data.comments == "") {
      console.log("888")
    } else {
      joinTeam(this.data.items.id, this.data.comments ).then(res=>{
        console.log(res)
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    getTeamApprovalList().then(res=>{
      console.log(res)
    })
    try {
      const teamID = options.id
      getTeamDesc(teamID).then(res => {
        this.setData({
          items: res.data
        })
      })
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
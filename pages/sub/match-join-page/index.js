import { createStoreBindings } from "mobx-miniprogram-bindings";
import { match } from "$/stores/match-store"
import { user } from "$/stores/user-store"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    match_id: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(encodeURIComponent("2VFGFgfnwzQIqYXodR5lr6NRbqM"))
    const scene = decodeURIComponent(options.scene)
    this.storeBindings = createStoreBindings(this, {
      store: match,
      fields: ["matchDetails"],
      actions: ["updateMatchDetails", "joinMatch"]
    });
    this.storeBindings_ = createStoreBindings(this, {
      store: user,
      fields: ["isUser"],
    });
    if (scene) {
      this.updateMatchDetails(scene)
      this.setData({
        match_id: scene
      })
    }
  },

  handleClick() {
    if (this.data.isUser) {
      this.joinMatch(this.data.match_id)
    }else {
      wx.showModal({
        title: '提示',
        content: '您需要先注册小程序，才能参加比赛',
        complete: (res) => {
          if (res.cancel) {
            
          }
      
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/sub/user-form/index?page=create',
            })
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
    this.storeBindings.destroyStoreBindings();
    this.storeBindings_.destroyStoreBindings();
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
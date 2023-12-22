import { createStoreBindings } from "mobx-miniprogram-bindings";
import { input } from "$/stores/input-store"
import { user } from "$/stores/user-store"
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    offset: app.globalData.common.navBarHeight,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store: input,
      fields: ["usersList", "indexList"],
      actions: ["updateUsersList"],
    })
    this.storeBindings_ = createStoreBindings(this, {
      store: user,
      // fields: ["usersList", "indexList"],
      actions: ["updateStarForm"],
    })
    this.updateUsersList()
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
  handleClick(e) {
    const item = e.currentTarget.dataset.item
    const patch = {
      userId: item.id,
      nickName: item.nickName
    }
    this.updateStarForm(patch)
    wx.navigateBack()
  },
  onShareAppMessage() {

  }
})
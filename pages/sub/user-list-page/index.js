import { createStoreBindings } from "mobx-miniprogram-bindings";
import { input } from "$/stores/input-store"

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    offset: app.globalData.common.navBarHeight,
    indexList: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    fakeData: {
      A: [
        "阿拉斯加"
      ],
      B: [
        "不不不"
      ],
      C: [
        "CCCC"
      ],
      D: [
        "DDDD"
      ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store: input,
      fields: ["usersList"],
      actions: ["updateUsersList"],
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
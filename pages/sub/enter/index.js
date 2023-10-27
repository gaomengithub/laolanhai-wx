import { iconUrls } from '$/urls'
import { createStoreBindings } from "mobx-miniprogram-bindings";
import { arena } from "../../../stores/arena-store";

Page({

  data: {
    iconUrls: {
      date: iconUrls.addCalendar,
      startTime: iconUrls.addStartTime,
      endTime: iconUrls.addEndTime,
      startAge: iconUrls.addStartAge,
      endAge: iconUrls.addEndAge,
      cost: iconUrls.addCost,
      upload: iconUrls.addUpload
    },

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.storeBindings = createStoreBindings(this, {
      store: match,
      actions: ["updateMatches", "modifyOptions"],
    });
    this.updateMatches()
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
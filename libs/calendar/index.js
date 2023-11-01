import { createStoreBindings } from "mobx-miniprogram-bindings";
import { match } from "$/stores/match-store";
Page({
  data: {
    navTitle: "日期选择",
    radio: "",
    type: "multiple",
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
    return `${date.getMonth() + 1}.${date.getDate()}`
  },

  onConfirm() {
    const calendar = this.selectComponent('.calendar');
    const currDate = calendar.data.currentDate
    let formatedDate = ""
    if (this.isConsecutive(currDate)) {
      formatedDate = `${this.formatDate(currDate[0])} - ${this.formatDate(currDate[currDate.length - 1])}`
    } else {
      formatedDate = currDate.map(timestamp => this.formatDate(timestamp)).join(', ')
    }

    const filter = {
      date: formatedDate
    }
    this.modifyOptions(filter)
    
    wx.navigateBack()

  },
  onReset() {
    const calendar = this.selectComponent('.calendar');
    calendar.reset()
  },


  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store: match,
      actions: ["modifyOptions"],
    });
  },
  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },
})
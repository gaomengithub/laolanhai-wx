// components/technical-statistics/vs-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  data: {
    percent: 45,
    offset: 0,
    percent_: 15,
    offset_: 0
  },
  lifetimes: {
    attached() {
      this.setData({
        offset: this.data.percent / 100 * 300 + 'rpx',
        offset_: this.data.percent_ / 100 * 300 + 'rpx'
      });
    }
  },
  methods: {

  }
})

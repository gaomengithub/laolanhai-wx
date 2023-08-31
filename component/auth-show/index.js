// component/auth-show/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    expect: {
      type: Array,
      value: []
    },
    unexpect: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    auth: false
  },
  lifetimes: {
    attached: function () {
      const quals = wx.getStorageSync('quals')
      const ls = quals.map(item => item.qual)
      if (this.data.expect.length > 0) {
        this.setData({
          auth: this.data.expect.some((item) => ls.includes(item))
        })
      }
      if (this.data.unexpect.length > 0) {
        this.setData({
          auth: !this.data.unexpect.some((item) => ls.includes(item))
        })
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

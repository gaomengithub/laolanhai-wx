// component/auth-show/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    expect: {
      type: String,
      value: ""
    },
  },
  observers: {
    'expect': function () {
      this.expectValidate()
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

    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    expectValidate: function () {
      try {
        // 现在是本地读取
        const quals = wx.getStorageSync('quals')
        const ls = quals.map(item => item.qual)
        if (this.data.expect == "no45") {
          const et = [4, 5]
          this.setData({
            auth: !et.some((num) => ls.includes(num))
          })
        }
        if (this.data.expect == "yes45") {
          const et = [4, 5]
          this.setData({
            auth: et.some((num) => ls.includes(num))
          })
        }
        if (this.data.expect.startsWith("yes4?")) {
          console.log(this.data.expect)
          const teamID = this.data.expect.split("4?")[1]
          const teamls = quals.map(item => item.teamId).filter(item => item !== undefined)
          this.setData({
            auth: teamls.includes(teamID)
          })
        }
        if (this.data.expect.startsWith("no45?")) {
          const teamID = this.data.expect.split("45?")[1]
          const teamls = quals.map(item => item.teamId).filter(item => item !== undefined)
          this.setData({
            auth: !teamls.includes(teamID)
          })
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
})

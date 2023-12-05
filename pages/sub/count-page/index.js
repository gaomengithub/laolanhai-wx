
Page({
  data: {
    icon: {
      vs: "https://openstore.obabyball.com/ui_v1/icon/vs-v2.svg"
    },
    redCount: 0,
    blueCount: 0,
    currMatchId: "",
  },

  onLoad(options) {
    if (options.id) {
      this.setData({
        currMatchId: options.id
      })
    }
  },

  onUnload() {

  },

  handleCount(e) {
    const countDown = this.selectComponent('#count-down');
    if (!countDown.data.status) {
      wx.showModal({
        title: '提示',
        content: '请先开始比赛',
        showCancel: false,
        complete: (res) => {
          if (res.confirm) {

          }
        }
      })
      return
    }
    const exp = e.currentTarget.dataset.exp
    const [key, val] = exp.split("&")
    if (this.data[key] + parseInt(val) < 0) {
      wx.showToast({
        title: '总分不得小于0',
        icon: 'error'
      })
      return
    }
    this.setData({
      [key]: this.data[key] + parseInt(val)
    })
  }
})

Component({

  properties: {

  },

  data: {
    status: false,
    value: 30 * 60 * 1000,
    columns: [{ values: ['10分钟', '15分钟', '20分钟', '25分钟', '30分钟', '40分钟'], defaultIndex: 4 }],
  },

  methods: {
    start() {
      wx.showModal({
        content: '确定开始比赛?',
        showCancel: true,
        title: '确定',
        complete: (res) => {
          if (res.confirm) {
            const countDown = this.selectComponent('.control-count-down');
            countDown.start();
            this.setData({
              status: true,
            })
          }
        },
      })
    },
    pause() {
      const countDown = this.selectComponent('.control-count-down');
      countDown.pause();
    },

    reset() {
      wx.showModal({
        title: '确定',
        content: '确定结束比赛？',
        complete: (res) => {
          if (res.cancel) {

          }

          if (res.confirm) {
            const countDown = this.selectComponent('.control-count-down');
            countDown.reset();
            this.setData({
              status: false,
            })
          }
        }
      })

    },

    finished() {
      wx.showModal({
        title: '提示',
        content: '比赛时间到，比赛结束。',
        showCancel: false,
        complete: (res) => {
          if (res.confirm) {
            this.reset()
          }
        }
      })
    },
    onShowPopup() {
      if (this.data.status) {
        wx.showToast({
          title: '请先结束比赛',
          icon: "error"
        })
        return
      }
      this.setData({
        show: true
      })
    },
    onPopupClose() {
      this.setData({ show: false });
    },
    onPickerChange(e) {
      this.setData({
        value: parseInt(e.detail.value[0].replace("分钟")) * 1000 * 60
      })
    },

  }
})

const prefix = "http://ryt5dzeq0.hn-bkt.clouddn.com/dev"

Component({
  data: {
    show: true,
    showPopup: false,
    selected: 0,
    color: "#A3A3A3",
    selectedColor: "#000000",
    list: [{
      pagePath: "/pages/home/index",
      iconPath: prefix + "/icon/icon_home.png",
      selectedIconPath: prefix +"/icon/icon_home_hl.png",
      text: "首页"
    }, {
      pagePath: "/pages/look/index",
      iconPath: prefix +"/icon/icon_look.png",
      selectedIconPath: prefix +"/icon/icon_look_hl.png",
      text: "观赛"
    }, {
      //占位
    }, {
      pagePath: "/pages/team/index",
      iconPath: prefix +"/icon/icon_ball.png",
      selectedIconPath: prefix +"/icon/icon_ball_hl.png",
      text: "球队"
    }, {
      pagePath: "/pages/mine/index",
      iconPath: prefix +"/icon/icon_mine.png",
      selectedIconPath: prefix +"/icon/icon_mine_hl.png",
      text: "我的"
    }],
    Fhalf: [],
    Bhalf: [],
  },
  attached() {
    this.setData({
      Fhalf: this.data.list.slice(0, 2),
      Bhalf: this.data.list.slice(2, 4)
    })
  },
  methods: {
    preventTouchMove: function () {
      //防止滚动穿透
    },
    onClosePopup() {
      this.setData({
        showPopup: false
      })
    },
    changePopup() {
      this.setData({
        showPopup: true
      })
    },
    // 自定义的 hide 方法
    hide() {
      this.setData({
        show: false
      })
    },
    // 自定义的 show 方法
    show() {
      this.setData({
        show: true
      })
    },
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      if (url != undefined) {
        wx.switchTab({
          url
        })
        this.setData({
          selected: data.index
        })
      }
    }
  }
})
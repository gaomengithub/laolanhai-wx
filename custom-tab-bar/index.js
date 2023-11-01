
Component({
  data: {
    show: true,
    showPopup: false,
    selected: 0,
    color: "#A3A3A3",
    selectedColor: "#000000",
    addIcon: 'https://openstore.obabyball.com/ui_v1/icon/bar-add-v1.svg',
    closeIcon: 'https://openstore.obabyball.com/ui_v1/icon/bar-close-v1.svg',
    list: [{
      pagePath: "/pages/home/index",
      iconPath: 'https://openstore.obabyball.com/ui_v1/icon/bar-home-grey-v1.svg',
      selectedIconPath: 'https://openstore.obabyball.com/ui_v1/icon/bar-home-v1.svg',
      text: "首页"
    }, {
      pagePath: "/pages/result/index",
      iconPath: 'https://openstore.obabyball.com/ui_v1/icon/bar-look-grey-v1.svg',
      selectedIconPath: 'https://openstore.obabyball.com/ui_v1/icon/bar-look-v1.svg',
      text: "赛况"
    }, {
      //占位
    }, {
      pagePath: "/pages/sphere/index",
      iconPath: 'https://openstore.obabyball.com/ui_v1/icon/bar-team-grey-v1.svg',
      selectedIconPath: 'https://openstore.obabyball.com/ui_v1/icon/bar-team-v1.svg',
      text: "球界"
    }, {
      pagePath: "/pages/mine/index",
      iconPath: 'https://openstore.obabyball.com/ui_v1/icon/bar-mine-grey-v1.svg',
      selectedIconPath: 'https://openstore.obabyball.com/ui_v1/icon/bar-mine-v1.svg',
      text: "我的"
    }],
  },
  attached() {

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
    showPopup() {
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
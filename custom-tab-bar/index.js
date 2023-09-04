import { iconUrls } from '../utils/urls'

Component({
  data: {
    show: true,
    showPopup: false,
    selected: 0,
    color: "#A3A3A3",
    selectedColor: "#000000",
    addIcon:iconUrls.barAdd,
    closeIcon:iconUrls.barClose,
    list: [{
      pagePath: "/pages/home/index",
      iconPath:  iconUrls.barHomeGrey,
      selectedIconPath: iconUrls.barHome,
      text: "首页"
    }, {
      pagePath: "/pages/look/index",
      iconPath:  iconUrls.barLookGrey,
      selectedIconPath: iconUrls.barLook,
      text: "赛况"
    }, {
      //占位
    }, {
      pagePath: "/pages/team/index",
      iconPath:  iconUrls.barTeamGrey,
      selectedIconPath: iconUrls.barTeam,
      text: "球队"
    }, {
      pagePath: "/pages/mine/index",
      iconPath:  iconUrls.barMineGrey,
      selectedIconPath: iconUrls.barMine,
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
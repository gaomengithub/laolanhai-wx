
const app = getApp()
let isFixed = false
const classNames = [".hot", ".official", ".diy", ".arena"]

Page({
  data: {
    navTitle: "老蓝孩俱乐部",
    banner: 'https://openstore.obabyball.com/ui_v1/img/banner-img-v1.png',
    tabs: [
      { title: "热门", icon: 'https://openstore.obabyball.com/ui_v1/icon/tab-hot-v1.svg' },
      { title: "正赛", icon: 'https://openstore.obabyball.com/ui_v1/icon/tab-official-v1.svg' },
      { title: "野球", icon: 'https://openstore.obabyball.com/ui_v1/icon/tab-diy-game-v2.svg' },
      { title: "场馆", icon: 'https://openstore.obabyball.com/ui_v1/icon/tab-arena-v1.svg' },
    ],
    showNarBar: false,
    active: 0,
    swiperHeight: "100vh",
    offsetTop: app.globalData.common.navBarHeight,
  },

  showNarBar(e) {
    if (e.detail.isFixed === isFixed) {
      return
    } else {
      this.setData({
        showNarBar: e.detail.isFixed
      })
      isFixed = e.detail.isFixed
    }
  },

  switchTab(e) {
    this.setData({
      active: e.currentTarget.dataset.index
    })
  },

  onPullDownRefresh() {

  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  onReady() {
    this.setSwiperHeight()
  },
  setSwiperHeight() {
    const currClassName = classNames[this.data.active]
    wx.createSelectorQuery().select(currClassName).boundingClientRect(rect => {
      if (rect.height >= app.globalData.common.windowHeight * 0.66) {
        this.setData({ swiperHeight: rect.height + 128 + 'px' });
      } else {
        this.setData({ swiperHeight: app.globalData.windowHeight * 0.66 + 'px' });
      }
    }).exec();
  },

  onShareAppMessage() {
    return {
      title: '老蓝孩',
      path: '/pages/home/index'
    }
  },

})
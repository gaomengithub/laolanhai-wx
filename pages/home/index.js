import { createStoreBindings } from "mobx-miniprogram-bindings";
import { match } from "../../stores/match-store";
const app = getApp()
let isFixed = false

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
    match_type: [],
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
    // 等待后端修改完成后调整
    const filter = {
      match_type: 1
    }
    this.modifyOptions(filter)
  },
  onLoad() {
    this.storeBindings = createStoreBindings(this, {
      store: match,
      actions: ["updateMatches", "modifyOptions"],
    });
  },
  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },

  onShareAppMessage() {
    return {
      title: '老蓝孩',
      path: '/pages/home/index'
    }
  },

})
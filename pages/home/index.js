import { createStoreBindings } from "mobx-miniprogram-bindings";
import { match } from "$/stores/match-store";
import { user } from "$/stores/user-store";
const app = getApp()
let isFixed = false

Page({
  data: {
    banner: 'https://openstore.obabyball.com/ui_v1/img/banner-img-v1.png',
    tabs: [
      { title: "热门", icon: 'https://openstore.obabyball.com/ui_v1/icon/tab-hot-v1.svg' },
      { title: "正赛", icon: 'https://openstore.obabyball.com/ui_v1/icon/tab-official-v1.svg' },
      { title: "野球", icon: 'https://openstore.obabyball.com/ui_v1/icon/tab-diy-game-v2.svg' },
    ],
    showNarBar: false,
    active: 0,
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
    const active = e.currentTarget.dataset.index
    this.setData({
      active
    })
    const filter = {
      match_type: [[], [1], [3]][active]
    }
    this.modifyOptions(filter)
  },

  onLoad() {
    this.storeBindings = createStoreBindings(this, {
      store: match,
      fields: ["matchesList"],
      actions: ["updateMatchesList", "modifyOptions"],
    });

    this.storeBindings_ = createStoreBindings(this, {
      store: user,
      fields: ["user"],
      // actions: ["updateMatchesList", "modifyOptions"],
    });
    this.updateMatchesList()
  },

  onUnload() {
    this.storeBindings.destroyStoreBindings();
    this.storeBindings_.destroyStoreBindings();
  },

  onShow() {
    // this.updateMatchesList()
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },

  onReachBottom() {
    if (match.options.page_token) {
      this.updateMatchesList()
    }
  },

  onShareAppMessage() {
    return {
      title: '老蓝孩',
      path: '/pages/home/index'
    }
  }

})
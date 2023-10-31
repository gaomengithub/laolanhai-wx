import routeInterceptor from '$/router'
import { createStoreBindings } from "mobx-miniprogram-bindings";
import { news } from "../../stores/news-store"
Page({

  data: {
    active: 0,
    icon: {
      news: 'https://openstore.obabyball.com/ui_v1/icon/news-create.svg'
    }
  },

  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store: news,
      fields: ["newsForm"],
      actions: ["updateNewsList"],
    })
    this.updateNewsList()
  },

  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },

  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },

  onBtnClick(e) {
    const path = `/pages/sub/create-modify-news/index`
    routeInterceptor.navigateTo(path)
  },
})
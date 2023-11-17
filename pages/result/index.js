import routeInterceptor from '$/utils/router'
import { createStoreBindings } from "mobx-miniprogram-bindings";
import { news } from "$/stores/news-store"
import { match } from "$/stores/match-store"
Page({

  data: {
    active: 0,
    icon: {
      news: 'https://openstore.obabyball.com/ui_v1/icon/news-create.svg'
    },
    offset: getApp().globalData.common.navBarHeight,
  },

  onLoad() {
    this.storeBindings = createStoreBindings(this, {
      store: news,
      fields: ["newsList"],
      actions: ["updateNewsList"],
    })
    this.updateNewsList()

    this.storeBindings_ = createStoreBindings(this, {
      store: match,
      fields: ["overMatchesList"],
      actions: ["updateOverMatchesList"],
    })
    const patch = {
      city: '',
      status: [2, 3, 4],
      match_type: [],
      page_size: 10,
      page_token: '',
      team_id: '',
      user_id: '',
      date: '全部时间'
    }
    this.updateOverMatchesList(patch)
  },

  onUnload() {
    this.storeBindings.destroyStoreBindings();
    this.storeBindings_.destroyStoreBindings();
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
    const path = `/pages/sub/news-form/index?page=new`
    routeInterceptor.navigateTo(path)
  },
})
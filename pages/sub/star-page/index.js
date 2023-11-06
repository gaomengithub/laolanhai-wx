import { createStoreBindings } from "mobx-miniprogram-bindings";
import { user } from "$/stores/user-store"

Page({
  data: {
    topBgImg: 'https://openstore.obabyball.com/ui_v1/img/detail-team-bg-img-v1-compress-v2.png'
  },

  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store: user,
      fields: ["starDetails"],
      actions: ["updateStarDetails",],
    });
    // 从其他页面跳转
    if (options.id) {
      this.updateStarDetails(options.id)
      return
    }
    // 从分享页跳转过来，后续可能两者会做些区别
    if (options.userID) {
      this.updateStarDetails(options.userID)
    }

    // this.updateStarDetails()
  },

  onShareAppMessage() {
    return {
      title: '球星卡',
      path: `/pages/sub/star-page/index?userID${this.data.id}`
    }
  }
})
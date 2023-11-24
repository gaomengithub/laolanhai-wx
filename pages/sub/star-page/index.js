import { createStoreBindings } from "mobx-miniprogram-bindings";
import { user } from "$/stores/user-store"

Page({
  data: {
    topBgImg: 'https://openstore.obabyball.com/ui_v1/img/detail-team-bg-img-v1-compress-v2.png'
  },
  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },

  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store: user,
      fields: ["starDetails"],
      actions: ["updateStarDetails",],
    });
    // 从其他页面跳转
    if (options.id) {
      this.updateStarDetails(options.id, false)
    }
    else if (options.userID) {
      this.updateStarDetails(options.userID, true)
    }

  },

  onShareAppMessage() {
    return {
      title: '球星卡',
      path: `/pages/sub/star-page/index?userID=${this.data.starDetails.id}`
    }
  }
})
import { createStoreBindings } from "mobx-miniprogram-bindings";
import { user } from "$/stores/user-store"
import routeInterceptor from '$/utils/router'
Page({
  data: {
    id: "",
    topBgImg: 'https://openstore.obabyball.com/ui_v1/img/detail-team-bg-img-v1-compress-v2.png'
  },
  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },

  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store: user,
      fields: ["starDetails", "isEditor"],
      actions: ["updateStarDetails"],
    });
    // 非分享
    if (options.id) {
      this.updateStarDetails(options.id, false)
      this.setData({
        id: options.id
      })
    }
    else if (options.userID) {
      this.updateStarDetails(options.userID, true)
      this.setData({
        id: options.userID
      })
    }
  },

  onEditClick(e) {
    const path = `/pages/sub/star-data-form/index?id=${this.data.id}`
    routeInterceptor.navigateTo(path)
  },

  onShareAppMessage() {
    return {
      title: '球星卡',
      path: `/pages/sub/star-page/index?userID=${this.data.starDetails.id}`
    }
  }
})
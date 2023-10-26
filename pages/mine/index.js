import { createStoreBindings } from "mobx-miniprogram-bindings";
import { user } from "../../stores/user-store"
import routeInterceptor from '$/router'
Page({
  data: {
    img: {
      light: 'https://openstore.obabyball.com/ui_v1/img/mine-light-img-v1.svg',
    },
    icon: {
      team: 'https://openstore.obabyball.com/ui_v1/icon/mine-team-v1.svg',
      apply: 'https://openstore.obabyball.com/ui_v1/icon/mine-apply-v1.svg',
      in: 'https://openstore.obabyball.com/ui_v1/icon/mine-in-v1.svg',
      edit: 'https://openstore.obabyball.com/ui_v1/icon/mine-user-edit-v2.svg',
      close: 'https://openstore.obabyball.com/ui_v1/icon/bar-close-v1.svg'
    },
    showPopup: false,
  },
  onCellClick(e) {
    if (e.currentTarget.dataset.path == 'apply') {
      this.showPopup()
      return
    }
    const path = `/pages/sub/${e.currentTarget.dataset.path}/index`
    routeInterceptor.navigateTo(path)
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
  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },
  onLoad() {
    this.storeBindings = createStoreBindings(this, {
      store: user,
      fields: ["user", "matches"],
      actions: ["updateUserInfo", "updateUserMatches"],
    })
    this.updateUserInfo()
    this.updateUserMatches()
  },


  onShow() {
    //tabbar
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 4
      })
    }
  },

})
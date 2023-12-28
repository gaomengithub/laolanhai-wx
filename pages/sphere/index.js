
import routeInterceptor from '$/utils/router'
import { createStoreBindings } from "mobx-miniprogram-bindings";
import { team } from "$/stores/team-store";
import { arena } from "$/stores/arena-store";
import { user } from "$/stores/user-store";
Page({
  data: {
    offset: getApp().globalData.common.navBarHeight,
    arrow: 'https://openstore.obabyball.com/ui_v1/icon/tab-arrow-v1.svg',
  },

  onLoad() {
    this.storeBindings = createStoreBindings(this, {
      store: team,
      fields: ["teamsList", "myTeams", "notMyTeams"],
      actions: ["updateTeamsList", "updateTeamDetails"],
    });
    this.updateTeamsList()

    this.storeBindings_ = createStoreBindings(this, {
      store: arena,
      fields: ["arenasList"],
      actions: ["updateArenasList"],
    });

    this.updateArenasList()


    this.storeBindings__ = createStoreBindings(this, {
      store: user,
      fields: ["usersList"],
      actions: ["updateUsersList"],
    });
    this.updateUsersList()
  },
  onUnload() {
    this.storeBindings.destroyStoreBindings();
    this.storeBindings_.destroyStoreBindings()
    this.storeBindings__.destroyStoreBindings()
  },

  ToTeamCreate() {
    const path = '/pages/sub/team-form/index?page=new'
    routeInterceptor.navigateTo(path)
  },

  handleTap(e) {
    const id = e.currentTarget.dataset.id
    const path = `/pages/sub/team-details/index?id=${id}`
    routeInterceptor.navigateTo(path)
  },

  onShow() {
    if (!this.storeBindings || !this.storeBindings_) {
      this.onLoad()
    }
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }
  },
})
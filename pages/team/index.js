
import routeInterceptor from '$/router'
import { createStoreBindings } from "mobx-miniprogram-bindings";
import { team } from "../../stores/team-store";
Page({
  data: {
    arrow: 'https://openstore.obabyball.com/ui_v1/icon/tab-arrow-v1.svg',
    navTitle: "球队",
  },

  onLoad() {
    this.storeBindings = createStoreBindings(this, {
      store: team,
      fields: ["teams", "myTeams", "notMyTeams"],
      actions: ["updateTeams"],
    });
    this.updateTeams()
  },
  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },

  ToTeamCreate() {
    const path = '/pages/sub/diy-team/index?type=create'
    routeInterceptor.navigateTo(path)
  },

  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }
  },
})
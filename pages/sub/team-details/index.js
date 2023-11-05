import { createStoreBindings } from "mobx-miniprogram-bindings";
import { team } from "$/stores/team-store"
Page({

  data: {
    arrow: 'https://openstore.obabyball.com/ui_v1/icon/tab-arrow-v1.svg',
    items: {},
    active: 0,
    teamID: "",
    comments: "",
    autosize: { minHeight: 50 },
    bgImg: 'https://openstore.obabyball.com/ui_v1/img/detail-team-bg-img-v1-compress-v2.png',

  },
  onChange(e) {
    const active = e.currentTarget.dataset.active
    this.setData({
      active
    })
  },

  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store: team,
      fields: ["teamDetails",],
      actions: ["updateTeamDetails", "updateTeamApprovals"],
    });

    if (options.id) {
      this.updateTeamApprovals(options.id)
      this.updateTeamDetails(options.id)
    }
  },

  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },
})
import { createStoreBindings } from "mobx-miniprogram-bindings";
import { team } from "$/stores/team-store"
Page({

  data: {
    arrow: iconUrls.tabArrow,
    items: {},
    active: 0,
    teamID: "",
    // showComments: false,
    comments: "",
    autosize: { minHeight: 50 },
    bgImg: imgUrls.detailTeamBgImg,

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
      fields: ["teamDetails","isInTeam"],
      actions: ["updateTeamDetails", "updateTeamApprovals"],
    });
    const id = options.id
    if (id) {
      this.updateTeamApprovals(id)
      this.updateTeamDetails(id)
    }
  },

  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },
})
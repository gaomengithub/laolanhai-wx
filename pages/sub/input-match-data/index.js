import { createStoreBindings } from "mobx-miniprogram-bindings";
import { input } from "$/stores/input-store";

Page({

  data: {
    offset: getApp().globalData.common.navBarHeight,
    radio: "",
    show: false,
    currMatchId: "",
    currAvatar: "",
    currName: "",
    currUserId: ""
  },

  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store: input,
      fields: ["homeTeamDetails", "visitingTeamDetails"],
      actions: ["getMatchTeams", "updatePlaying", "updateMatchPoints"],
    });
    if (options.id) {
      this.getMatchTeams(options.id)
      this.setData({
        currMatchId: options.id
      })
    }
  },

  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },

  onPlayingChange(e) {
    const id = e.currentTarget.dataset.id
    this.updatePlaying(id)
  },

  showPopup(e) {
    const item = e.currentTarget.dataset.item
    this.setData({
      show: true,
      currAvatar: item.avatar,
      currName: item.nickName,
      currUserId: item.id
    })
  },
  handleRecord(e) {
    console.log(this.data.radio)
    this.updateMatchPoints(this.data.currMatchId, this.data.currUserId, parseInt(this.data.radio))
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  onRadioChange(e) {
    this.setData({
      radio: e.detail,
    });
  }

})
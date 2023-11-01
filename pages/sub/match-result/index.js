import { createStoreBindings } from "mobx-miniprogram-bindings";
import { match } from "../../../stores/match-store"
Page({
  data: {
    active: ['1', '2'],
    maxCount: 5,
  },

  onChange(event) {
    this.setData({
      active: event.detail,
    });
  },
  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store: match,
      fields: ["matchResult", ],
      actions: ["updateMatchResult"]
    });
    if (options.id) {
      this.updateMatchResult(options.id)
    }
  },

  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },



})
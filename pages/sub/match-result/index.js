import { createStoreBindings } from "mobx-miniprogram-bindings";
import { match } from "$/stores//match-store"
Page({
  data: {
    active: ['1', '2','3'],
  },

  onChange(event) {
    this.setData({
      active: event.detail,
    });
  },
  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store: match,
      fields: ["matchResult",],
      actions: ["updateMatchResult"]
    });
    if (options.id) {
      this.updateMatchResult(options.id)
    }
  },

  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },
  afterRead(e) {
    const { file } = e.detail;
    this.updateMatchResult(file)
  },
  deleteImg(e) {
    const index = e.detail.index
    this.updateMatchResult(index)
  },

})
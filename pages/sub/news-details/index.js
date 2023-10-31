import { createStoreBindings } from "mobx-miniprogram-bindings";
import { news } from "../../../stores/news-store";
Page({
  data: {
    poster: 'https://openstore.obabyball.com/ui_v1/img/news-details-poster-compress.jpg',
    active: ['1'],
  },

  onChange(event) {
    this.setData({
      active: event.detail,
    });
  },

  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store: news,
      fields: ["newsDetails"],
      actions: ["updateNewsDetails"]
    });
    const id = options.id
    if (id) {
      this.updateNewsDetails(id)
    } else {

    }
  },

  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },

})
import { createStoreBindings } from "mobx-miniprogram-bindings";
import { news } from "../../../stores/news-store"
Page({
  data: {
    icon: {
      date: 'https://openstore.obabyball.com/ui_v1/icon/add-calendar-v1.png',
      start_time: 'https://openstore.obabyball.com/ui_v1/icon/add-start-time-v1.png',
      end_time: 'https://openstore.obabyball.com/ui_v1/icon/add-end-time-v1.png',
      upload: 'https://openstore.obabyball.com/ui_v1/icon/add-upload-v1.svg'
    },

  },

  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store: news,
      fields: ["newsForm"],
      actions: ["updateNewsForm", "activeNews", "modifyNewsForm"],
    });
  },

  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },

})
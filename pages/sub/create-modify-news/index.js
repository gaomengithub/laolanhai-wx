import { createStoreBindings } from "mobx-miniprogram-bindings";
import { news } from "../../../stores/news-store"
import { formatDate } from '$/util'
import { options } from '$/pca-code'
Page({
  data: {
    options,
    icon: {
      date: 'https://openstore.obabyball.com/ui_v1/icon/add-calendar-v1.png',
      start_time: 'https://openstore.obabyball.com/ui_v1/icon/add-start-time-v1.png',
      end_time: 'https://openstore.obabyball.com/ui_v1/icon/add-end-time-v1.png',
      upload: 'https://openstore.obabyball.com/ui_v1/icon/add-upload-v1.svg'
    },
    autoSize: { minHeight: 50 },
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
  onDisplay(e) {
    const show = e.currentTarget.dataset.show
    const curr = this.data[show]
    this.setData({
      [show]: !curr
    })
  },

  onAfterRead(e) {
    const { file } = e.detail;
    this.updateNewsForm(file)
  },

  deleteImg(e) {
    const index = e.detail.index
    this.updateNewsForm(index)
  },

  handleClick() {
    this.activeNews()
  },

  handler(e) {
    console.log(e)
    const key = e.currentTarget.dataset.key
    let val = e.detail
    if (key == 'date') {
      const date = new Date(e.detail)
      val = formatDate(date)
    }
    if (key == 'region') {
      const { selectedOptions } = e.detail
      val = selectedOptions.map((option) => option.text).join('/')
    }
    if (e.type == 'confirm') {
      this.onDisplay(e)
    }
    const form = {
      [key]: val
    }
    this.updateNewsForm(form)
  },
})
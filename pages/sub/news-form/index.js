import { createStoreBindings } from "mobx-miniprogram-bindings";
import { news } from "$/stores/news-store"
import { formatDate } from '$/utils/util'
import { options } from '$/utils/pca-code'
Page({
  data: {
    regionVal: '',
    options,
    icon: {
      date: 'https://openstore.obabyball.com/ui_v1/icon/add-calendar-v1.png',
      start_time: 'https://openstore.obabyball.com/ui_v1/icon/add-start-time-v1.png',
      end_time: 'https://openstore.obabyball.com/ui_v1/icon/add-end-time-v1.png',
      upload: 'https://openstore.obabyball.com/ui_v1/icon/add-upload-v1.svg'
    },
    autoSize: { minHeight: 50 },
    fieldNames: {
      text: 'text',
      value: 'text',
      children: 'children',
    },
  },

  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store: news,
      fields: ["newsForm"],
      actions: ["updateNewsForm", "activeNews", "modifyNewsForm", "initNewsForm"],
    });
    if (options.page == "new") {
      this.initNewsForm()
    }
    else if (options.page == "modify" && options.id) {
      this.updateNewsForm(options.id)
    }
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
    const key = e.currentTarget.dataset.key
    let val = e.detail
    if (key == 'date') {
      const date = new Date(e.detail)
      val = formatDate(date)
    }
    else if (key == 'region') {
      const { selectedOptions, value } = e.detail;
      const fieldValue = selectedOptions.map((option) => option.text).join('/');
      val = fieldValue
      this.setData({ regionVal: value })
    }

    if (e.type == "confirm" || e.type == "select" || e.type == "finish") {
      this.onDisplay(e)
    }

    const form = {
      [key]: val
    }
    this.updateNewsForm(form)
  },
})
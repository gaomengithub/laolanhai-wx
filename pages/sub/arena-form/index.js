import { createStoreBindings } from "mobx-miniprogram-bindings";
import { arena } from "$/stores/arena-store";
import { yearMonth } from '$/utils/util'

import { options } from '$/utils/pca-code'
Page({

  data: {
    regionVal:"",
    options: options,  //地区选择，
    autoSize: { minHeight: 50 },
    icon: {
      date: 'https://openstore.obabyball.com/ui_v1/icon/add-calendar-v1.png',
      start_time: 'https://openstore.obabyball.com/ui_v1/icon/add-start-time-v1.png',
      end_time: 'https://openstore.obabyball.com/ui_v1/icon/add-end-time-v1.png',
      price: 'https://openstore.obabyball.com/ui_v1/icon/add-cost-v1.png',
      upload: 'https://openstore.obabyball.com/ui_v1/icon/add-upload-v1.svg'
    },
    minHour: 8,
    maxHour: 18,
    fieldNames: {
      text: 'text',
      value: 'text',
      children: 'children',
    },
    showStartTimePicker: false,
    showEndTimePicker: false,
    showCalendar: false,
    showAreaCascader: false,
  },
  handler(e) {
    const key = e.currentTarget.dataset.key
    let val = e.detail
    if (key == 'date') {
      const date = new Date(e.detail)
      val = yearMonth(date)
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
    this.updateArenaForm(form)
  },
  onAfterRead(e) {
    const { file } = e.detail;
    this.updateArenaForm(file)
  },

  deleteImg(e) {
    const index = e.detail.index
    this.updateArenaForm(index)
  },

  onDisplay(e) {
    const show = e.currentTarget.dataset.show
    const curr = this.data[show]
    this.setData({
      [show]: !curr
    })
  },

  handleClick() {
    this.activeArena()
  },

  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store: arena,
      fields: ["arenaForm"],
      actions: ["updateArenaForm", "activeArena", "initArenaForm"],
    });
    if (options.page == 'new') {
      this.initArenaForm()
    } else if (options.page == 'modify' && options.id) {
      this.updateArenaForm(options.id)
    }
  },
  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },
})
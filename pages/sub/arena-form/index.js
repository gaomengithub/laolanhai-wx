import { createStoreBindings } from "mobx-miniprogram-bindings";
import { arena } from "$/stores/arena-store";
import { yearMonth } from '$/utils/util'
import { options } from '$/utils/pca-code'
import { handleErr } from '../../../modules/msgHandler'
Page({

  data: {
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
    showMatchTpyePicker: false,
    showAreaCascader: false,
    showCostAction: false,
  },
  handler(e) {
    const key = e.currentTarget.dataset.key
    let val = null
    if (e.type == 'confirm' || e.type == 'finish') {
      this.onDisplay(e)
      if (key == 'date') {
        const date = new Date(e.detail)
        // vant 组件要求传入时间戳 
        val = yearMonth(date)
      }
      else if (key == 'region') {
        const { selectedOptions } = e.detail
        val = selectedOptions.map((option) => option.text).join('/');
      } else {
        val = e.detail
      }
    }
    else if (e.type == 'select') {
      val = e.detail.name
    }
    else if (e.type == 'change') {
      const str = e.detail
      if (Number(str) && parseInt(str)) {
        val = parseInt(str)
      } else {
        val = str
      }
    }
    else {
      //未知的类型
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

  onLoad() {
    this.storeBindings = createStoreBindings(this, {
      store: arena,
      fields: ["arenaForm"],
      actions: ["updateArenaForm", "activeArena"],
    });
  },
  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },
})
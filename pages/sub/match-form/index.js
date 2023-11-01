import { options } from '$/utils/pca-code'
import { createStoreBindings } from "mobx-miniprogram-bindings";
import { match } from "$/stores/match-store"
import { formatDate } from '$/utils/util'
import { handleErr } from '../../../modules/msgHandler'
Page({
  data: {
    options: options,  //地区选择
    autoSize: { minHeight: 80 },
    icon: {
      date: 'https://openstore.obabyball.com/ui_v1/icon/add-calendar-v1.png',
      start_time: 'https://openstore.obabyball.com/ui_v1/icon/add-start-time-v1.png',
      end_time: 'https://openstore.obabyball.com/ui_v1/icon/add-end-time-v1.png',
      age_group_start: 'https://openstore.obabyball.com/ui_v1/icon/add-up-v1.png',
      age_group_end: 'https://openstore.obabyball.com/ui_v1/icon/add-down-v1.png',
      price: 'https://openstore.obabyball.com/ui_v1/icon/add-cost-v1.png',
      upload: 'https://openstore.obabyball.com/ui_v1/icon/add-upload-v1.svg'
    },
    // 页面控制
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
    actions: [{ name: "免费" }, { name: "约10元" }, { name: "约20元" }, { name: "约30元" }],
  },

  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store: match,
      fields: ["matchForm"],
      actions: ["updateMatchForm", "activeMatch", "initMatchForm"],
    });

    if (options.page == 'new' && options.match_type) {
      this.initMatchForm()
      const form = {
        match_type: parseInt(options.match_type)
      }
      this.updateMatchForm(form)
    }
    else if (options.page == 'modify' && options.id) {
      this.updateMatchForm(options.id)
    } else {
      handleErr("参数非法")
    }
  },

  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },

  handler(e) {
    const key = e.currentTarget.dataset.key
    let val = null
    if (e.type == 'confirm' || e.type == 'finish') {
      this.onDisplay(e)
      if (key == 'date') {
        const date = new Date(e.detail)
        val = formatDate(date)
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
    this.updateMatchForm(form)
  },

  onAfterRead(e) {
    const { file } = e.detail;
    this.updateMatchForm(file)
  },

  deleteImg(e) {
    const index = e.detail.index
    this.updateMatchForm(index)
  },

  onDisplay(e) {
    const show = e.currentTarget.dataset.show
    const curr = this.data[show]
    this.setData({
      [show]: !curr
    })
  },

  handleClick() {
    this.activeMatch()
  }
})
import { createStoreBindings } from "mobx-miniprogram-bindings";
import { user } from "$/stores/user-store"

Page({

  data: {
    show: false,
    icon: {
      upload: 'https://openstore.obabyball.com/ui_v1/icon/add-upload-v1.svg',
    },
    id: "",
    actions: [
      { name: "中锋" },
      { name: "控球后卫" },
      { name: "得分后卫" },
      { name: "小前锋" },
      { name: "大前锋" },

    ],
  },
  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },


  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store: user,
      fields: ["starForm"],
      actions: ["updateStarForm", , "activeStar"],
    });
    if (options.id) {
      this.updateStarForm(options.id)
      this.setData({
        id: options.id
      })
    }
  },
  handleClick() {
    this.activeStar(this.data.id)
  },
  onAfterRead(e) {
    const { file } = e.detail;
    this.updateStarForm(file)
  },

  deleteImg(e) {
    const index = e.detail.index
    this.updateStarForm(index)
  },
  handler(e) {
    const key = e.currentTarget.dataset.key
    let val = e.detail
    if (key == 'position') {
      val = e.detail.name
    }
    const form = {
      [key]: parseInt(val) ? parseInt(val) : val
    }
    this.updateStarForm(form)
  },
  onCellClick() {
    this.setData({
      show: true
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
})
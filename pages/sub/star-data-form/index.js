import { createStoreBindings } from "mobx-miniprogram-bindings";
import { user } from "$/stores/user-store"


import { handleErr } from '../../../modules/msgHandler'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon: {
      upload: 'https://openstore.obabyball.com/ui_v1/icon/add-upload-v1.svg',

    },

  },
  onUnload(){
    this.storeBindings.destroyStoreBindings();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store: user,
      fields: ["starForm"],
      actions: ["updateStarForm", , "activeStar"],
    });
    if (options.id) {
      this.updateStarForm(options.id)
    }
  },
  handleClick() {
    this.activeStar()
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
    const form = {
      [key]: parseInt(val) ? parseInt(val) : val
    }
    this.updateStarForm(form)
  },
})
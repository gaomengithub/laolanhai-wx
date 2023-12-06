import { createStoreBindings } from "mobx-miniprogram-bindings";
import { match } from "$/stores/match-store";
Page({

  data: {
    banner: "https://openstore.obabyball.com/ui_v1/img/banner%20%281%29.jpg",
    // form: {
    //   assist: "",
    //   block: "",
    //   hit_free_throw: "",
    //   hit_three_point: "",
    //   hit_two_point: "",
    //   is_win: false,
    //   match_id: "",
    //   rebound: "",
    //   steal: "",
    //   total_free_throw: "",
    //   total_three_point: "",
    //   total_two_point: "",
    //   total_point: 0,
    // },
    icon: {
      assist: "https://openstore.obabyball.com/ui_v1/icon/%E7%AF%AE%E7%90%83%E5%8A%A9%E6%94%BB.svg",
      block: "https://openstore.obabyball.com/ui_v1/icon/%E7%9B%96%E5%B8%BD-v2.svg",
      hit_free_throw: "https://openstore.obabyball.com/ui_v1/icon/%E7%BD%9A%E7%90%83.svg",
      hit_three_point: "https://openstore.obabyball.com/ui_v1/icon/%E4%B8%89%E5%88%86%E7%90%83.svg",
      hit_two_point: "https://openstore.obabyball.com/ui_v1/icon/%E4%BA%8C%E5%88%86%E7%90%83.svg",
      is_win: "https://openstore.obabyball.com/ui_v1/icon/%E8%8E%B7%E8%83%9C.svg",
      match_id: "",
      rebound: "https://openstore.obabyball.com/ui_v1/icon/%E7%AF%AE%E6%9D%BF.svg",
      steal: "https://openstore.obabyball.com/ui_v1/icon/%E7%8A%AF%E8%A7%84-v2.svg",
      total_free_throw: "https://openstore.obabyball.com/ui_v1/icon/%E7%BD%9A%E7%90%83.svg",
      total_three_point: "https://openstore.obabyball.com/ui_v1/icon/%E4%B8%89%E5%88%86%E7%90%83.svg",
      total_two_point: "https://openstore.obabyball.com/ui_v1/icon/%E4%BA%8C%E5%88%86%E7%90%83.svg",
      total_point: "https://openstore.obabyball.com/ui_v1/icon/%E8%AE%A1%E7%AE%97.svg",
    }
  },




  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store: match,
      fields: ["customInputForm"],
      actions: ["activeCustomMatchRecord", "updateCustomInputForm"],
    });
    if (options.id) {
      const patch = {
        match_id: options.id
      }
      this.updateCustomInputForm(patch)
      this.updateCustomInputForm() 
      // this.setData({
      //   ['form.match_id']: options.id
      // })
    }


  },


  onReady() {

  },


  onShow() {

  },

  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },
  onChange(e) {
    // const items = ['hit_free_throw', 'hit_two_point', 'hit_three_point']

    const key = e.currentTarget.dataset.key
    let val = e.detail
    const patch = {
      [key]: parseInt(val) || e.detail,
    }

    this.updateCustomInputForm(patch)

    // try {
    //   val = parseInt(e.detail) || e.detail
    // } catch (e) {

    // }
    // this.setData({
    //   [`form.${key}`]: val
    // })
    // if (items.includes(key)) {
    //   const form = this.data.form
    //   const sum = form.hit_free_throw * 1 + form.hit_two_point * 2 + form.hit_three_point * 3

    //   this.setData({
    //     ['form.total_point']: parseInt(sum)
    //   })
    // }
  },
  handleActive() {
    this.activeCustomMatchRecord()
  }
})
import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import { user } from "$/stores/user-store";

Component({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store: user,
    fields: ["user","joinedMatches"],
    actions:["updateUserMatches"]
  },
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    img:'https://openstore.obabyball.com/ui_v1/img/diy-match-tag-img-v1.png'
  },
  lifetimes:{
    attached(){
      this.updateUserMatches()
    }
  },
  methods: {
    onClick() {
      wx.navigateTo({
        url: `/pages/sub/star-page/index?id=${this.data.user.id}`
      })
    }

  }
})

import { createStoreBindings } from "mobx-miniprogram-bindings";
import { user } from "$/stores/user-store"
Page({

  data: {
    icon: {
      win: "https://openstore.obabyball.com/ui_v1/icon/%E5%A5%96%E7%89%8C.svg",
      loss: "https://openstore.obabyball.com/ui_v1/icon/%E5%A5%96%E7%89%8C-%E5%A4%B1%E8%B4%A5-v2.svg",
    },
    gradientColor: {
      '0%': '#FB8808',
      '100%': '#FAFAFA',
    },
    active: 0,
  },

  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },

  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store: user,
      fields: ["userInfo", "playerData"],

    })
    

  }

})
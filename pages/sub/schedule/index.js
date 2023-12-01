import { createStoreBindings } from "mobx-miniprogram-bindings";
import { match } from "$/stores/match-store"
import routeInterceptor from '$/utils/router'
Page({

  data: {
    activeNames: [],
    fake: [
      {
        redTeam: {
          name: "战胜自我队",
          avatar: "https://openstore.obabyball.com/ui_v1/icon/%E6%A3%AE%E6%9E%97%E7%8B%BC%20%281%29.png"
        },
        blueTeam: {
          name: "战胜他人队",
          avatar: "https://openstore.obabyball.com/ui_v1/icon/%E9%A3%9E%E8%B1%B9%20%281%29.png"

        },
        start_time: "2023-10-19",
        group: "A 组"
      },
      {
        redTeam: {
          name: "吃饭不排队",
          avatar: "https://openstore.obabyball.com/ui_v1/icon/%E9%A3%9E%E8%B1%B9%20%281%29.png"

        },
        blueTeam: {
          name: "啥啥都队",
          avatar: "https://openstore.obabyball.com/ui_v1/icon/%E6%A3%AE%E6%9E%97%E7%8B%BC%20%281%29.png"
        },
        start_time: "2023-10-19",
        group: "A 组"
      },
    ]
  },

  onLoad(options) {

    this.storeBindings = createStoreBindings(this, {
      store: match,
      fields: ["matchResult"],
      actions: ["updateMatchResult"]
    });
    // 先用这个接口代替，正常要返回带有赛程信息数据，先用模拟数据
    if (options.id) {
      this.updateMatchResult(options.id)
    }

  },
  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },

  onReady() {

  },

  onCollapseChange(e) {
    this.setData({
      activeNames: e.detail,
    });
  },

  handleToResult() {
    console.log("1")
    const path = "/pages/sub/match-result/index?id=" + this.data.matchResult.id
    routeInterceptor.navigateTo(path)
  }

})
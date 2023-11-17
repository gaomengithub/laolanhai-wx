import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import { user } from "$/stores/user-store";
import routeInterceptor from '$/utils/router'
Component({
  behaviors: [storeBindingsBehavior],
  properties: {

  },
  storeBindings: {
    store: user,
    fields: ["starDetails", "id"]
  },
  data: {
    bgImg: "https://openstore.obabyball.com/ui_v1/img/star-card-bg-img.png",
    personImg: "https://openstore.obabyball.com/ui_v1/img/star-card-bg-img-v1.png",
    leftOffset: '40rpx',
    bottomOffset: '40px',

  },

  methods: {
    onEditClick(e) {
      const path = `/pages/sub/star-data-form/index?id=${this.data.id}`
      routeInterceptor.navigateTo(path)
    },
    translateByClick() {
      count++
      if (count % 2 == 0) {
        this.setData({
          leftOffset: '40rpx',
          bottomOffset: '40px',
        })
      } else {
        this.setData({
          leftOffset: '322rpx',
          bottomOffset: '40px',
        })
      }
    }
  }
})

let count = 0
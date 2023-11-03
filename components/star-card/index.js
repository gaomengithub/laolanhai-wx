import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import { user } from "$/stores/user-store";
import routeInterceptor from '$/utils/router'
Component({
  behaviors: [storeBindingsBehavior],
  properties: {

  },
  storeBindings: {
    store: user,
    fields: ["starDetails"]
  },
  data: {
    bgImg: "https://openstore.obabyball.com/ui_v1/img/star-card-bg-img.png",
    personImg: "https://openstore.obabyball.com/ui_v1/img/star-card-bg-img-v1.png"
  },

  methods: {
    onEditClick(e) {

      const path = `/pages/sub/star-data-form/index?id=${e.currentTarget.dataset.id}`
      routeInterceptor.navigateTo(path)
    }
  }
})

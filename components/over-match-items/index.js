import { iconUrls, imgUrls } from '$/urls'
import routeInterceptor from '$/router'
import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import { user } from "../../stores/";
Component({
  properties: {

  },

  data: {

  },
  storeBindings: {
    store: user,
    fields: ["user"]
  },
  methods: {
    toMatchDesc(e) {
      const path = "/pages/sub/details/look/index"
      routeInterceptor.navigateTo(path)
    },

  }
})

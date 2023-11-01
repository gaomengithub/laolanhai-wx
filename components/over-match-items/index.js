import routeInterceptor from '$/router'
import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import { match } from "../../stores/match-store";
Component({
  behaviors: [storeBindingsBehavior],
  properties: {

  },

  data: {

  },
  storeBindings: {
    store: match,
    fields: ["overMatchesList"]
  },
  methods: {
    HandlerClick(e) {
      const id =  e.currentTarget.dataset.id
      const path = `/pages/sub/match-result/index?id=${id}`
      routeInterceptor.navigateTo(path)
    },

  }
})

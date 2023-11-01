import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import { news } from "$/stores//news-store";
import routeInterceptor from '$/utils/router'
Component({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store: news,
    fields: ["newsList"]
  },
  properties: {

  },

  data: {

  },

  methods: {
    handleClick(e) {
      const id = e.currentTarget.dataset.id
      const path = `/pages/sub/news-details/index?id=${id}`
      routeInterceptor.navigateTo(path)
    }

  }
})

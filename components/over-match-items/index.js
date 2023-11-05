import routeInterceptor from '$/utils/router'
Component({
  properties: {
    items: {
      type: Object,
      value: []
    }
  },

  data: {

  },

  methods: {
    HandlerClick(e) {
      const id = e.currentTarget.dataset.id
      const path = `/pages/sub/match-result/index?id=${id}`
      routeInterceptor.navigateTo(path)
    },

  }
})

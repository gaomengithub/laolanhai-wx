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
      const match_type = e.currentTarget.dataset.match_type
      console.log(match_type)
      let path = ""
      if (match_type == 3) {
        path = `/pages/sub/schedule/index?id=${id}`
      } else {
        path = `/pages/sub/match-result/index?id=${id}`

      }
      routeInterceptor.navigateTo(path)
    },

  }
})

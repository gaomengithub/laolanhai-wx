
import routeInterceptor from '$/utils/router'
Component({

  properties: {
    items: {
      type: Array,
      value: []
    },
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

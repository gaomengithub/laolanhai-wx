import routeInterceptor from "$/utils/router"
Component({
  properties: {
    items: {
      type: Object,
      value: []
    }

  },

  data: {
    tagImg: 'https://openstore.obabyball.com/ui_v1/img/arena-bg-tag.svg',
    icon: {
      clock: 'https://openstore.obabyball.com/ui_v1/icon/arena-card-clock.svg',
      location: 'https://openstore.obabyball.com/ui_v1/icon/arena-card-location.svg'
    },
  },

  methods: {
    handlerClick(e) {
      const path = `/pages/sub/arena-details/index?id=${e.currentTarget.dataset.id}`
      routeInterceptor.navigateTo(path)
    }
  }
})

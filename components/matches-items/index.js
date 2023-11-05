import routeInterceptor from '$/utils/router'

Component({
  properties: {
    items: {
      type: Array,
      value: []
    }
  },
  data: {
    img: 'https://openstore.obabyball.com/ui_v1/img/diy-match-tag-img-v1.png',
    icon: {
      clock: 'https://openstore.obabyball.com/ui_v1/icon/match-card-clock-v1.svg',
      location: 'https://openstore.obabyball.com/ui_v1/icon/match-card-location-v1.svg'
    }
  },

  lifetimes: {

  },
  methods: {
    handlerClick(e) {
      const id = e.currentTarget.dataset.id
      const path = `/pages/sub/match-details/index?id=${id}`
      routeInterceptor.navigateTo(path)
    }
  },
});
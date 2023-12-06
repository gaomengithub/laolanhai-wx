
import routeInterceptor from '$/utils/router'
Component({

  properties: {
    items: {
      type: Array,
      value: []
    }
  },


  data: {
    link: 'https://openstore.obabyball.com/ui_v1/icon/arrow-grey.svg'
  },

  methods: {
    handleToInput(e) {
      const id = e.currentTarget.dataset.id
      const path = `/pages/sub/custom-match-data/index?id=${id}`
      routeInterceptor.navigateTo(path)
    }
  }
})

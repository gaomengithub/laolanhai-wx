import routeInterceptor from '$/utils/router'

Component({
  properties: {

  },

  data: {
    icon: {
      greyArrow: 'https://openstore.obabyball.com/ui_v1/icon/arrow-grey.svg',
      blackArrow: 'https://openstore.obabyball.com/ui_v1/icon/arrow-black.svg',
      official: 'https://openstore.obabyball.com/ui_v1/icon/tab-official-v1.svg',
      diySolo: 'https://openstore.obabyball.com/ui_v1/icon/tab-diy-game-v2.svg',
      diyTeam: 'https://openstore.obabyball.com/ui_v1/icon/tab-diy-game-v2.svg',
      arena: 'https://openstore.obabyball.com/ui_v1/icon/tab-arena-v1.svg'
    }
  },

  methods: {
    onClick(e) {
      const path = e.currentTarget.dataset.path
      routeInterceptor.navigateTo(path)
      this.triggerEvent("closeAction")
    }
  }
})

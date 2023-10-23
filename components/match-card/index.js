import { iconUrls, imgUrls } from '$/urls'
import routeInterceptor from '$/router'
Component({
  properties: {
    match: {
      type: Object,
      value: {}
    }
  },
  data: {
    iconUrl: {
      clock: iconUrls.matchCardClock,
      address: iconUrls.matchCardLocation
    },
    //背景里面的小图
    matchCardBgImage: imgUrls.matchCardBgImage
  },

  lifetimes: {

  },

  methods: {
    onJoinBtn() {
      const path = `/pages/sub/details/match/index?matchID=${this.data.match.id}&matchType=${this.data.match.match_type}`
      routeInterceptor.navigateTo(path)
    }
  }
})
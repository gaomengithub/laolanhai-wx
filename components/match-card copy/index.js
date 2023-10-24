import routeInterceptor from '$/router'
import matchStore from '../../stores/match-store'

Component({
  properties: {

  },
  data: matchStore.data,

  lifetimes: {
    attached() {
      matchStore.bind(this)
      matchStore.updateMatches()
    }
  },

  methods: {

    onJoinBtn() {
      const path = `/pages/sub/details/match/index?matchID=${this.data.match.id}&matchType=${this.data.match.match_type}`
      routeInterceptor.navigateTo(path)
    }
  }
})
import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import { match } from "$/stores/match-store";
import { search } from "$/stores/search-store";
import routeInterceptor from '$/utils/router'
Component({
  behaviors:[storeBindingsBehavior],
  properties: {
    switchIdx: {
      type: Number,
      value: 0
    }
  },
  data: {
    tagImg: {
      diy: 'https://openstore.obabyball.com/ui_v1/img/diy-match-tag-img-v1.png',
      official: 'https://openstore.obabyball.com/ui_v1/img/official-match-tag-img.svg'
    },
    icon: {
      clock: 'https://openstore.obabyball.com/ui_v1/icon/match-card-clock-v1.svg',
      location: 'https://openstore.obabyball.com/ui_v1/icon/match-card-location-v1.svg'
    }
  },
  storeBindings: [
    {
      store: match,
      fields: ["matchesList"]
    },
    {
      store: search,
      fields: ["matchSearchResult"]
    }
  ],


  lifetimes: {
    // attached() {
    //   const bindSettings = {
    //     store: this.data.isSearch ? search : match,
    //     fields: {
    //       matchesList: () => this.data.isSearch ? search.matches : match.matchesList
    //     },
    //   }
    //   this.storeBindings = createStoreBindings(this, bindSettings)
    // }
  },
  methods: {
    handlerClick(e) {
      // id  为赛事id
      const id = e.currentTarget.dataset.id
      const path = `/pages/sub/match-details/index?id=${id}`
      routeInterceptor.navigateTo(path)
    }
  },
});
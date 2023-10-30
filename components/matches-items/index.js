import { createStoreBindings } from "mobx-miniprogram-bindings";
import { match } from "../../stores/match-store";
import { search } from "../../stores/search-store";
import routeInterceptor from '$/router'
Component({
  properties: {
    isSearch: {
      type: Boolean,
      value: false
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

  lifetimes: {
    attached() {
      const bindSettings = {
        store: this.data.isSearch ? search : match,
        fields: {
          matches: () => this.data.isSearch ? search.matches : match.matches
        },
      }
      this.storeBindings = createStoreBindings(this, bindSettings)
    }
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
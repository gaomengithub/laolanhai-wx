import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import { match } from "$/stores/match-store";
import routeInterceptor from '$/utils/router'
Component({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store: match,
    fields: {
      date: () => match.options.date,
      city: () => match.options.city,
    },
  },
  properties: {

  },

  data: {
    icon: {
      search: 'https://openstore.obabyball.com/ui_v1/icon/tab-search-v1.svg',
      arrow: 'https://openstore.obabyball.com/ui_v1/icon/tab-arrow-v1.svg',
    }
  },

  methods: {
    onBtnClick(e){
      const path = e.currentTarget.dataset.path
      routeInterceptor.navigateTo(path)
    }
  }
})

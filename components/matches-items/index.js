import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import { match } from "../../stores/match-store";
import { search } from "../../stores/search-store";
Component({
  behaviors: [storeBindingsBehavior],
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
  storeBindings: [{
    store: search,
  }, {
    store: match,
    fields: {
      matches: function () {
        return this.data.isSearch ? search.matches : match.matches
      }
    },
    actions: {
      updateMatches: "updateMatches",
    },
  }],

  lifetimes: {
    attached() {
      if (!this.data.isSearch) {
        this.updateMatches()
      }
    }
  },
  methods: {

  },
});
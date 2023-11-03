
import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import { match } from "$/stores/match-store";
Component({
  behaviors: [storeBindingsBehavior],
  properties: {
    items: {
      type: Object,
      value: []
    }
  },
  storeBindings: {
    store: match,
    // fields: ["joinedMatches"]
  },

  data: {
    link: 'https://openstore.obabyball.com/ui_v1/icon/arrow-grey.svg'
  },

  methods: {

  }
})

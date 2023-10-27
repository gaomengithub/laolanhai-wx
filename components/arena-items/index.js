import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import { arena } from "../../stores/arena-store";
Component({
  behaviors:[storeBindingsBehavior],
  properties: {

  },
  storeBindings: {
    store:arena,
    fields: ["arenas"]
  },
  data: {
    tagImg: 'https://openstore.obabyball.com/ui_v1/img/arena-bg-tag.svg',
    icon: {
      clock: 'https://openstore.obabyball.com/ui_v1/icon/arena-card-clock.svg',
      location: 'https://openstore.obabyball.com/ui_v1/icon/arena-card-location.svg'
    },
  },

  methods: {

  }
})

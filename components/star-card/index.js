import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import { user } from "$/stores/user-store";
Component({
  behaviors: [storeBindingsBehavior],
  properties: {

  },
  storeBindings: {
    store:user,
    fields: ["user"]
  },
  data: {
    bgImg:"https://openstore.obabyball.com/ui_v1/img/star-card-bg-img.png",
    personImg:"https://openstore.obabyball.com/ui_v1/img/star-card-bg-img-v1.png"
  },

  methods: {

  }
})

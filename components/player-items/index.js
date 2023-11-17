import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import { user } from "$/stores/user-store";
Component({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store: user,
    fields: ["tags"],
  },
  properties: {
    items: {
      type:Array,
      value:[]
    }
  },

  data: {

  },

  methods: {

  }
})

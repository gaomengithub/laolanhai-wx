import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import { user } from "$/stores/user-store";
Component({
  behaviors: [storeBindingsBehavior],
  properties: {

  },
  storeBindings: [{
    store: user,
    fields: ["user","tags"],
    actions: [],
  }],
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

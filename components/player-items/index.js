import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import { team } from "../../stores/team-store";

Component({
  behaviors: [storeBindingsBehavior],
  properties: {

  },

  data: {

  },
  storeBindings: {
    store: team,
    fields: ["teamDetails"],
    actions: [],
  },
  methods: {

  }
})

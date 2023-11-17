import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import { team } from "$/stores/team-store";
Component({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store: team,
    actions: ["activeApprove"]
  },
  properties: {
    items: {
      type: Array,
      value: []
    }

  },

  data: {

  },
  lifetimes: {

  },

  methods: {
    onButtonClick(e) {
      const id = e.currentTarget.dataset.id
      const action = e.currentTarget.dataset.action
      const rev = e.currentTarget.dataset.rev
      let obj = {
        "action": action,
        "approve_id": id,
        "comment": "string",
        "rev": rev + 1
      }
      this.activeApprove(obj)
    }
  }
})

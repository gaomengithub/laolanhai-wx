import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import { match } from "../../stores/match-store";
import { imgSet } from "$/img/index"
import { iconSet } from "$/icon/index"
Component({
  behaviors: [storeBindingsBehavior],
  data: {
    tagImg: imgSet.diyMatchTagImg,
    icon: {
      clock: iconSet.matchCardClock,
      location: iconSet.matchCardLocation
    }
  },
  storeBindings: {
    store: match,
    fields: {
      matches: () => match.matches
    },
    actions: {
      updateMatches: "updateMatches",
    },
  },
  lifetimes: {
    attached() {
      this.updateMatches()
    }
  },
  methods: {
  },
});
import { createStoreBindings } from "mobx-miniprogram-bindings";
import { search } from "$/stores/search-store";

Page({

  data: {
    value: "",
    active: 0,
  },
  onLoad() {
    this.storeBindings = createStoreBindings(this, {
      store: search,
      fields: ["matchSearchResult", "teamSearchResult", "userSearchResult"],
      actions: ["search"],
    });
  },
  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },
  onInputChange(e) {
    this.setData({
      value: e.detail,
    });
  },
  async onClickSearch() {
    this.search(this.data.value)
  },

})
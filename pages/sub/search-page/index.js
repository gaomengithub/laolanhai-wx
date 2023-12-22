import { createStoreBindings } from "mobx-miniprogram-bindings";
import { search } from "$/stores/search-store";
import routeInterceptor from '$/utils/router'
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
  onClickSearch() {
    this.search(this.data.value)
  },
  onStarBtn(e) {
    const path = '/pages/sub/star-page/index?userID=' + e.currentTarget.dataset.id
    routeInterceptor.navigateTo(path)
  }
})
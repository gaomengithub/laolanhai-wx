import { createStoreBindings } from "mobx-miniprogram-bindings";
import { news } from "$/stores/news-store";
import { handleErr } from '../../../modules/msgHandler'
Page({
  data: {
    show: false,
    actions: [{ name: '删除资讯', color: '#ee0a24' }, { name: '编辑资讯' }],
    poster: 'https://openstore.obabyball.com/ui_v1/img/news-details-poster-compress.jpg',
    active: ['1'],
    icon: {
      edit: 'https://openstore.obabyball.com/ui_v1/icon/match-detail-edit-v2.svg',
    },
  },

  onChange(event) {
    this.setData({
      active: event.detail,
    });
  },
  handleClick() {
    this.setData({
      show: !this.data.show
    })
  },
  onSelect(e) {
    if (e.detail.name == '删除资讯') {

    } else {
      const path = `/pages/sub/create-modify-news/index?page=modify&id=${this.data.match.id}`
      routeInterceptor.navigateTo(path)
    }
  },

  onDisplay(e) {
    const show = e.currentTarget.dataset.show
    const curr = this.data[show]
    this.setData({
      [show]: !curr
    })
  },

  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store: news,
      fields: ["newsDetails"],
      actions: ["updateNewsDetails"]
    });
    const id = options.id
    if (id) {
      this.updateNewsDetails(id)
    } else {

    }
  },

  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },

})
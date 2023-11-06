import { createStoreBindings } from "mobx-miniprogram-bindings";
import { arena } from "$/stores/arena-store"
import routeInterceptor from "$/utils/router"
Page({


  data: {
    actions: [{ name: '删除', color: '#ee0a24' }, { name: '编辑' }],
    show: false,
    icon: {
      edit: 'https://openstore.obabyball.com/ui_v1/icon/match-detail-edit-v2.svg',
    },
  },
  onDisplay(e) {
    const show = e.currentTarget.dataset.show
    const curr = this.data[show]
    this.setData({
      [show]: !curr
    })
  },
  onSelect(e) {
    if (e.detail.name == '删除') {
      this.deleteArena(this.data.arenaDetails.id)
    } else {
      const path = `/pages/sub/arena-form/index?page=modify&id=${this.data.arenaDetails.id}`
      routeInterceptor.navigateTo(path)
    }
  },
  handleClick() {
    this.setData({
      show: !this.data.show
    })
  },


  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store: arena,
      fields: ["arenaDetails"],
      actions: ["updateArenaDetails","deleteArena"],
    });
    if (options.id) {
      this.updateArenaDetails(options.id)
    }
  },
  onUnload() {
    this.storeBindings.destroyStoreBindings();
  }
})
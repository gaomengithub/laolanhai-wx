import { createStoreBindings } from "mobx-miniprogram-bindings";
import { team } from "$/stores/team-store"
import routeInterceptor from "$/utils/router"
Page({

  data: {
    arrow: 'https://openstore.obabyball.com/ui_v1/icon/tab-arrow-v1.svg',
    show: false,
    actions: [{ name: '删除', color: '#ee0a24' }, { name: '编辑' }],
    autosize: { minHeight: 50 },
    bgImg: 'https://openstore.obabyball.com/ui_v1/img/detail-team-bg-img-v1-compress-v2.png',
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
  onChange(e) {
    const active = e.currentTarget.dataset.active
    this.setData({
      active
    })
  },
  handleClick() {
    this.setData({
      show: !this.data.show
    })
  },
  onSelect(e) {
    if (e.detail.name == '删除') {
      this.deleteTeam(this.data.newsDetails.id)
    } else {
      const path = `/pages/sub/team-form/index?page=modify&id=${this.data.teamDetails.id}`
      routeInterceptor.navigateTo(path)
    }
  },
  onJoinBtn(e) {
    const id = e.currentTarget.dataset.id
    this.joinTeam(id)
  },

  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store: team,
      fields: ["teamDetails",],
      actions: ["updateTeamDetails", "updateTeamApprovals", "joinTeam"],
    });

    if (options.id) {
      this.updateTeamApprovals(options.id)
      this.updateTeamDetails(options.id)
    }
  },

  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },
})
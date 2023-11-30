import { createStoreBindings } from "mobx-miniprogram-bindings";
import { team } from "$/stores/team-store"
import routeInterceptor from "$/utils/router"
Page({

  data: {
    // columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    columns: function () {
      let arr = [];
      for (let i = 0; i < 100; i++) {
        arr.push(i + " 号");
      }
      return arr;
    }(),

    arrow: 'https://openstore.obabyball.com/ui_v1/icon/tab-arrow-v1.svg',
    show: false,
    showNumberSelect: false,
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

  handleNumberSelect() {
    const jerseyNumber = this.selectComponent("#picker").getIndexes()[0]
    this.joinTeam(this.data.teamDetails.id, jerseyNumber.toString())
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
    this.setData({
      showNumberSelect: true
    })

  },

  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store: team,
      fields: ["teamDetails", "teamApprovals"],
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
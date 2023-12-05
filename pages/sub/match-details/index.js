import { createStoreBindings } from "mobx-miniprogram-bindings";
import { match } from "$/stores/match-store";
import { user } from "$/stores/user-store"
import routeInterceptor from '$/utils/router'
import { handleErr } from '../../../modules/msgHandler'
Page({
  data: {
    show: false,
    // showPopup: false,
    actions: {
      user: [{ name: '计分器' }],
      owner: [{ name: '计分器' }, { name: '编辑比赛详情' }, { name: '结束比赛', color: '#ee0a24' }]
    },
    radio: 0,
    icon: {
      edit: 'https://openstore.obabyball.com/ui_v1/icon/match-detail-edit-v2.svg',
      clock: 'https://openstore.obabyball.com/ui_v1/icon/desc-clock-v1.svg',
      location: 'https://openstore.obabyball.com/ui_v1/icon/desc-location-v1.svg',
      star: 'https://openstore.obabyball.com/ui_v1/icon/octagonal-star.svg',
      type: 'https://openstore.obabyball.com/ui_v1/icon/desc-diy-tag-v1.svg',
    },
    showTeamSelect: false
    // swiperImgHeight: wx.getSystemInfoSync().windowWidth + 'px',
    // swiperHeight: wx.getSystemInfoSync().windowWidth + 'px',
    // windowWidth: wx.getSystemInfoSync().windowWidth,
  },

  onJoinBtnForTeam() {
    const idx = this.data.radio
    const teamId = this.data.user.myTeams[idx].id
    this.joinMatch(this.data.matchDetails.id, teamId)
  },

  onJoinBtn() {
    if (this.data.matchDetails.match_type == 2) {
      this.setData({
        showTeamSelect: true
      })
      return
    }
    if (this.data.matchDetails.id) {
      this.joinMatch(this.data.matchDetails.id)
    }
  },
  onDisplay(e) {
    const show = e.currentTarget.dataset.show
    const curr = this.data[show]
    this.setData({
      [show]: !curr
    })
  },

  handleCatch() {

  },

  onRadioChange(event) {
    this.setData({
      radio: event.detail
    });
  },

  onCellClick(e) {
    const { name } = e.currentTarget.dataset;
    this.setData({
      radio: name,
    });
  },

  onSelect(e) {
    let path = ""
    if (e.detail.name == '计分器') {
      if (this.data.matchDetails.match_type == 3) {
        path = '/pages/sub/count-page/index?id=' + this.data.matchDetails.id
      }
      else if (this.data.matchDetails.match_type == 2) {
        path = '/pages/sub/input-match-data/index?id=' + this.data.matchDetails.id
      }
    }
    else if (e.detail.name == "编辑比赛详情") {
      path = `/pages/sub/match-form/index?page=modify&id=${this.data.matchDetails.id}`
    }
    else if (e.detail.name == "录入比赛数据") {
      path = `/pages/sub/custom-match-data/index?id=${this.data.matchDetails.id}`
    }
    else if (e.detail.name == "结束比赛") {
      this.updateMatchStatus(this.data.matchDetails.id, 4)
      // path = `/pages/sub/custom-match-data/index?id=${this.data.matchDetails.id}`
    }
    routeInterceptor.navigateTo(path)
  },

  // 更改比赛状态
  // handleClick() {
  //   this.setData({
  //     showPopup: false
  //   })
  //   this.updateMatchStatus(this.data.matchDetails.id, parseInt(this.data.radio))
  //   if (this.data.radio == '3') {
  //     wx.navigateTo({
  //       url: '/pages/sub/input-match-data/index?id=' + this.data.matchDetails.id,
  //     })
  //   }
  // },

  onUnload() {
    this.storeBindings.destroyStoreBindings();
    this.storeBindings_.destroyStoreBindings();
  },
  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store: match,
      fields: ["matchDetails"],
      actions: ["updateMatchDetails", "joinMatch", "updateMatchStatus"],
    });
    this.storeBindings_ = createStoreBindings(this, {
      store: user,
      fields: ["id", "user"],
    });
    if (options.id) {
      this.updateMatchDetails(options.id)
    } else {
      handleErr("比赛详情，非法的比赛id")
    }
  },


})
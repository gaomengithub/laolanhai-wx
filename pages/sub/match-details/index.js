import { createStoreBindings } from "mobx-miniprogram-bindings";
import { match } from "../../../stores/match-store";
import { user } from "../../../stores/user-store"
import routeInterceptor from '$/router'
import { handleErr } from '../../../modules/msgHandler'
Page({
  data: {
    show: false,
    showPopup: false,
    actions: [{ name: '变更比赛状态', color: '#ee0a24' }, { name: '编辑比赛详情' }],
    radio: '0',
    icon: {
      edit: 'https://openstore.obabyball.com/ui_v1/icon/match-detail-edit-v2.svg',
      clock: 'https://openstore.obabyball.com/ui_v1/icon/desc-clock-v1.svg',
      location: 'https://openstore.obabyball.com/ui_v1/icon/desc-location-v1.svg',
      star: 'https://openstore.obabyball.com/ui_v1/icon/octagonal-star.svg',
      type: 'https://openstore.obabyball.com/ui_v1/icon/desc-diy-tag-v1.svg',
    },
    swiperImgHeight: wx.getSystemInfoSync().windowWidth + 'px',
    swiperHeight: wx.getSystemInfoSync().windowWidth + 'px',
    windowWidth: wx.getSystemInfoSync().windowWidth,
  },

  onJoinBtn() {
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

  onChange(event) {
    let radio = event.detail
    const { name } = event.currentTarget.dataset;
    if (name) {
      radio = name
    }
    this.setData({
      radio
    });
  },

  onSelect(e) {
    if (e.detail.name == '变更比赛状态') {
      this.setData({
        showPopup: true
      })
    } else {
      const path = `/pages/sub/create-modify-match/index?page=modify&id=${this.data.matchDetails.id}`
      routeInterceptor.navigateTo(path)
    }
  },

  swiperChange(e) {
    const ls = [this.data.matchDetails.banner_attachments, ...this.data.matchDetails.attachments]
    const currImg = ls[e.detail.current]
    wx.getImageInfo({
      src: currImg,
      success: (res) => {
        let scale = null
        if (res.height >= res.width) {
          scale = this.data.windowWidth * 4 / 3
        } else {
          scale = this.data.windowWidth * 3 / 4
        }
        this.setData({
          swiperImgHeight: scale + 'px',
          swiperHeight: scale + 'px'
        })
      }
    })
  },
  // 更改比赛状态
  handleClick() {
    this.setData({
      showPopup: false
    })
    this.updateMatchStatus(this.data.matchDetails.id, parseInt(this.data.radio))
  },

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
      fields: ["id"],
    });
    if (options.id) {
      this.updateMatchDetails(options.id)
    } else {
      handleErr("比赛详情，非法的比赛id")
    }
  },

  onReady() {
    const e = {
      detail: { current: 0 }
    }
    this.swiperChange(e)
  }
})
import { createStoreBindings } from "mobx-miniprogram-bindings";
import { match } from "../../../../stores/match-store";
import { user } from "../../../../stores/user-store"
import routeInterceptor from '$/router'
Page({
  data: {
    navTitle: "老蓝孩俱乐部",
    icon: {
      edit: 'https://openstore.obabyball.com/ui_v1/icon/match-edit-v1.svg',
      clock: 'https://openstore.obabyball.com/ui_v1/icon/desc-clock-v1.svg',
      location: 'https://openstore.obabyball.com/ui_v1/icon/desc-location-v1.svg',
      star: 'https://openstore.obabyball.com/ui_v1/icon/octagonal-star.svg',
      type: 'https://openstore.obabyball.com/ui_v1/icon/desc-diy-tag-v1.svg',
    },
    swiperImgHeight: wx.getSystemInfoSync().windowWidth + 'px',
    swiperHeight: wx.getSystemInfoSync().windowWidth + 'px',
    windowWidth: wx.getSystemInfoSync().windowWidth,
  },
  onEditBtn() {
    const path = `/pages/sub/create-modify-match/index?page=modify&id=${this.data.match.id}`
    routeInterceptor.navigateTo(path)
  },

  onJoinBtn() {
    if (this.data.match.id) {
      this.joinMatch(this.data.match.id)
    }
  },

  swiperChange(e) {
    const ls = [this.data.match.banner_attachments, ...this.data.match.attachments]
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

  onUnload() {
    this.storeBindings.destroyStoreBindings();
    this.storeBindings_.destroyStoreBindings();
  },
  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store: match,
      fields: ["match"],
      actions: ["updateMatch", "joinMatch"],
    });
    this.storeBindings_ = createStoreBindings(this, {
      store: user,
      fields: ["id"],
    });
    const id = options.id
    if (id) {
      this.updateMatch(id)
    } else {
      wx.showModal({
        title: '错误',
        content: '获取比赛出错id',
        showCancel: false,
        complete: (res) => {
          if (res.confirm) {
            wx.navigateBack()
          }
        }
      })
    }
  },
  onReady() {
    const e = {
      detail: { current: 0 }
    }
    this.swiperChange(e)
  }
})
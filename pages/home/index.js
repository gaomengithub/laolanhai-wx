import { getMatchList, getDownloadToken } from '../../utils/api'

import { iconUrls, imgUrls } from '../../utils/urls'
const app = getApp()

Page({
  data: {
    navTitle: "老蓝孩俱乐部",
    bannerImg: imgUrls.bannerImg,
    tabs: ["热门", "正赛", "野球"],
    tabIcon: [iconUrls.tabHot, iconUrls.tabOfficial, iconUrls.tabUnofficial],
    showNarBar: false,
    loading: false,
    matchList: [],
    unofficialMatchList: [],
    activeTab: 0,
    swiperHeight: "100vh",
    offsetTop: app.globalData.navBarHeight,
  },
  showNarBar(e) {
    if (e.detail.isFixed) {
      this.setData({
        showNarBar: true
      })
    } else {
      this.setData({
        showNarBar: false
      })
    }
  },
  switchTab(e) {
    this.setData({
      activeTab: e.currentTarget.dataset.index
    })
  },
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
    this.onLoad()
  },

  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  onPageScroll() {
    this.setSwiperHeight()
  },
  setSwiperHeight() {
    const className = [".content-hot", ".content-official", ".content-unofficial"][this.data.activeTab]
    wx.createSelectorQuery().select(className).boundingClientRect(rect => {
      this.setData({ swiperHeight: rect.height  + 128 + 'px' });
    }).exec();
  },
  onLoad() {

    // let matchList = []
    getMatchList().then(res => {
      const bannerAttachments = res.data.matches.map(item => item.banner_attachments)
      getDownloadToken({ file_names: bannerAttachments }).then(token => {
        for (let [index, item] of res.data.matches.entries()) {
          item.banner_attachments = token.data[index] == undefined ? 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg' : token.data[index]
        }
        this.setData({
          matchList: res.data.matches
        })
        let unofficialMatchList = this.data.matchList.filter(item => item.match_type === 3)
        this.setData({
          unofficialMatchList: unofficialMatchList
        })
      })
    }).catch(e => {
      console.log(e)
    })
  },
  swiperChange(e) {
    this.setData({
      activeTab: e.detail.current
    })
  },
  onReachBottom() {
    this.setData({
      loading: true
    })
    // this.getMatchList()
  },

  onReady() {

  },
  onClickFilterBtn(e) {
    this.getTabBar().hide()
    const key = e.currentTarget.dataset.key
    this.setData({
      [key]: true
    })
  }
})
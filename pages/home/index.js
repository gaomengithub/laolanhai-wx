import { getMatchList } from '$/api'
import { iconUrls, imgUrls } from '$/urls'


const app = getApp()
let old = false
const classNameList = [".content-hot", ".content-official", ".content-diy"]

Page({

  data: {
    loading: true,
    navTitle: "老蓝孩俱乐部",
    bannerImg: imgUrls.bannerImg,
    tabs: ["热门", "正赛", "野球"],
    tabIcon: [iconUrls.tabHot, iconUrls.tabOfficial, iconUrls.tabUnofficial],
    showNarBar: false,
    matchList: [],
    diyMatchList: [],
    officialMatchList: [],
    activeTab: 0,
    swiperHeight: "100vh",
    offsetTop: app.globalData.navBarHeight,
  },

  showNarBar(e) {
    if (e.detail.isFixed === old) {
      return
    } else {
      this.setData({
        showNarBar: e.detail.isFixed
      })
      old = e.detail.isFixed
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
  },
  setSwiperHeight() {
    const className = classNameList[this.data.activeTab]
    wx.createSelectorQuery().select(className).boundingClientRect(rect => {
      if (rect.height >= app.globalData.windowHeight * 0.66) {
        this.setData({ swiperHeight: rect.height + 128 + 'px' });
      } else {
        this.setData({ swiperHeight: app.globalData.windowHeight * 0.66 + 'px' });
      }
    }).exec();
  },
  onLoad() {
    const filter = {
      city: "",
      match_type: 0,
      page_size: 10,
      page_token: "",
      team_id: "",
      user_id: ""
    }
    getMatchList(filter).then(res => {
      const diyMatchList = res.data.matches.filter(item => item.match_type == 3)
      this.setData({
        diyMatchList,
        matchList: res.data.matches
      }, (() => {
        this.setSwiperHeight()
      }))
    }).catch(e => {
      console.log(e)
    })
  },
  swiperChange(e) {
    this.setData({
      activeTab: e.detail.current
    }, (() => {
      this.setSwiperHeight()
    }))
  },
  onReachBottom() {
    // this.getMatchList()
  },

  onReady() {
    this.setData({
      loading: false,
    });
  },
  onShareAppMessage() {
    return {
      title: '老蓝孩',
      imageUrl: imgUrls.bannerImg
    }
  },
  onClickFilterBtn(e) {
    this.getTabBar().hide()
    const key = e.currentTarget.dataset.key
    this.setData({
      [key]: true
    })
  }
})
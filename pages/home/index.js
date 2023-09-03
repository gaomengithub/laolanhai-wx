import { getMatchList } from '$/api'
import { iconUrls, imgUrls } from '$/urls'


const app = getApp()
let old = false
const classNameList = [".content-hot", ".content-official", ".content-unofficial"]

Page({

  data: {
    navTitle: "老蓝孩俱乐部",
    bannerImg: imgUrls.bannerImg,
    tabs: ["热门", "正赛", "野球"],
    tabIcon: [iconUrls.tabHot, iconUrls.tabOfficial, iconUrls.tabUnofficial],
    showNarBar: false,
    matchList: [],
    unofficialMatchList: [],
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
    // this.setSwiperHeight()
  },
  setSwiperHeight() {
    const className = classNameList[this.data.activeTab]
    wx.createSelectorQuery().select(className).boundingClientRect(rect => {
      this.setData({ swiperHeight: rect.height + 128 + 'px' });
    }).exec();
  },
  onLoad() {
    getMatchList().then(res => {
      this.setData({
        matchList: res.data.matches
      },(()=>{
        this.setSwiperHeight()
      }))
      const unofficialMatchList = this.data.matchList.filter(item => item.match_type === 3)
      this.setData({
        unofficialMatchList: unofficialMatchList
      },(()=>{
        this.setSwiperHeight()
      }))
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
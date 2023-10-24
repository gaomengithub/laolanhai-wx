import { getMatches } from '$/api'
import { imgUrls } from '$/urls'
import { iconSet } from '$/icon/index'

const app = getApp()
let old = false
const classNameList = [".content-hot", ".content-official", ".content-diy"]

Page({
  data: {
    loading: true,
    navTitle: "老蓝孩俱乐部",
    banner: imgUrls.bannerImg,
    tabs: [
      { title: "热门", icon: iconSet.tabHot },
      { title: "正赛", icon: iconSet.tabOfficial },
      { title: "野球", icon: iconSet.tabDiyGame },
      { title: "场馆", icon: '' },
    ],
    showNarBar: false,
    active: 0,
    swiperHeight: "100vh",
    offsetTop: app.globalData.common.navBarHeight,
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
    console.log(e)
    this.setData({
      active: e.currentTarget.dataset.index
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
    // if (app.globalData.currCity != "全国") {
    //   let city = app.globalData.currCity
    //   this.loadMatchList(city)
    // }
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
    //订阅
    // const { globalData } = getApp()
    // globalData.setEvent('ON_CITY_CHANGE', this.loadMatchList);

    // this.loadMatchList(globalData.currCity)
  },
  onUnload() {
    const { globalData } = getApp();
    globalData.removeEvent('ON_CITY_CHANGE', this.loadMatchList);
  },
  loadMatchList(city) {
    city = city.replace("全国", "");
    const filter = {
      city: city,
      match_type: 0,
      page_size: 10,
      page_token: "",
      team_id: "",
      user_id: ""
    }
    getMatches(filter).then(res => {
      if (res.data.matches != null) {
        const diyMatchList = res.data.matches.filter(item => item.match_type == 3)
        this.setData({
          diyMatchList,
          matchList: res.data.matches
        }, (() => {
          this.setSwiperHeight()
        }))
      } else {
        this.setData({
          matchList: [],
          diyMatchList: []
        })
      }
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
      path: '/pages/home/index'
    }
  },
  onShareTimeline() {
    return {
      title: '老蓝孩',
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
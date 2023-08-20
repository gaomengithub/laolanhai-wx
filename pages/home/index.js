import { getMatchList } from '../../utils/api'
import { formatForMatchCard } from '../../utils/util'
const app = getApp()

Page({
  data: {
    navTitle: "老蓝孩俱乐部",
    tabs: ["热门", "正赛", "野球"],
    tabIcon: [
      "http://ryt5dzeq0.hn-bkt.clouddn.com/dev/icon/hot-3x.png",
      "http://ryt5dzeq0.hn-bkt.clouddn.com/dev/icon/official-3x.png",
      "http://ryt5dzeq0.hn-bkt.clouddn.com/dev/icon/pink-ball-3x.png"
    ],
    searchIcon: "http://ryt5dzeq0.hn-bkt.clouddn.com/dev/icon/search.png",
    triangleIcon: "http://ryt5dzeq0.hn-bkt.clouddn.com/dev/icon/triangle-3x.png",
    active: '热门',
    showNarBar: false,
    loading: false,
    matchList: [],
    activeTab: 0,
    swiperHeight: "100vh",
    offsetTop: app.globalData.navBarHeight,
    currCity: "全国",
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
    this.setData({
      currCity: app.globalData.currCity
    })
  },
  onPageScroll() {
    this.setSwiperHeight()
  },
  setSwiperHeight() {
    wx.createSelectorQuery().select(".content-hot").boundingClientRect(rect => {
      this.setData({ swiperHeight: rect.height + 'px' });
    }).exec();
  },
  onLoad() {
    let matchList = []
    getMatchList().then(res => {
      console.log(res)
      for (let item of res.data.matches) {
        matchList.push(
          {
            id: item.id,
            matchType: item.match_type,
            title: item.name,
            date: formatForMatchCard(item.start_time),
            img: "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg",
            address: item.location,
            // avatars: ["头像地址1", "头像地址2"]
          }
        )
      }
      this.setData({
        matchList: matchList
      })
    }).catch(e => {
      console.log(e)
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
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
    showNarBar: false,
    loading: false,
    matchList: [],
    unofficialMatchList: [],
    activeTab: 0,
    swiperHeight: "100vh",
    offsetTop: app.globalData.navBarHeight,
    currCity: "",
    currDate: ""
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
      currCity: app.globalData.currCity,
      currDate: app.globalData.currDate
    })
  },
  onPageScroll() {
    this.setSwiperHeight()
  },
  setSwiperHeight() {
    const className = [".content-hot", ".content-official", ".content-unofficial"][this.data.activeTab]
    wx.createSelectorQuery().select(className).boundingClientRect(rect => {
      this.setData({ swiperHeight: rect.height + 120 + 'px' });
    }).exec();
  },
  onLoad() {
    let matchList = []
    getMatchList().then(res => {
      for (let item of res.data.matches) {
        matchList.push(
          {
            id: item.id,
            matchType: item.match_type,
            title: item.name,
            date: formatForMatchCard(item.start_time),
            img: "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg",
            address: item.location,
            status: ["报名中", "进行中", "已结束"][item.status],
            num: item.teams.length + item.users.length
            // avatars: ["头像地址1", "头像地址2"]
          }
        )
      }
      this.setData({
        matchList: matchList
      })
      let unofficialMatchList = matchList.filter(item => item.matchType === 3)
      this.setData({
        unofficialMatchList: unofficialMatchList
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
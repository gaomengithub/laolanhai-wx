const app = getApp()

const noShowActiveUrls = [
  "pages/index/index",
  "pages/look/index",
  "pages/team/index",
  "pages/mine/index"
]

Component({
  properties: {
    title: {
      type: String,
      value: ""
    },
  },
  data: {
    navBarHeight: app.globalData.navBarHeight,
    menuRight: app.globalData.menuRight,
    menuTop: app.globalData.menuTop,
    menuHeight: app.globalData.menuHeight,
    showBackNav: false
  },
  attached: function () {
    let pages = getCurrentPages();    //获取加载的页面
    let currentPage = pages[pages.length - 1];    //获取当前页面的对象
    let url = currentPage.route;    //当前页面url
    if (noShowActiveUrls.includes(url)) {
      this.setData({
        showBackNav: false
      })
    } else {
      this.setData({
        showBackNav: true
      })
    }
  },
  methods: {}
})
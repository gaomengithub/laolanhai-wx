const app = getApp()

const switchTabUrls = [
  "pages/home/index",
  "pages/result/index",
  "pages/sphere/index",
  "pages/mine/index"
]

// 有滚动吸附的页面，主要是修复像首页那样吸顶后占位组件高度闪烁的问题
const scrollSnapUrls = [
  "pages/home/index",
]

Component({
  properties: {
    title: {
      type: String,
      value: "老蓝孩俱乐部"
    },
  },
  data: {
    navBarHeight: app.globalData.common.navBarHeight,
    menuRight: app.globalData.common.menuRight,
    menuTop: app.globalData.common.menuTop,
    menuHeight: app.globalData.common.menuHeight,

    showBackNav: false,
    placeholder: true
  },
  attached: function () {
    let pages = getCurrentPages();    //获取加载的页面
    let currentPage = pages[pages.length - 1];    //获取当前页面的对象
    let url = currentPage.route;    //当前页面url
    if (scrollSnapUrls.includes(url)) {
      this.setData({
        placeholder: false
      })
    }
    if (switchTabUrls.includes(url)) {
      this.setData({
        showBackNav: false
      })
    } else {
      this.setData({
        showBackNav: true
      })
    }
  },
  methods: {

  }
})
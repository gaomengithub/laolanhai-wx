
App({
  onLaunch() {
    const systemInfo = wx.getSystemInfoSync();
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    this.globalData.navBarHeight = systemInfo.statusBarHeight + 44;
    this.globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.right;
    this.globalData.menuTop = menuButtonInfo.top;
    this.globalData.menuHeight = menuButtonInfo.height;
  },
  globalData: {
    navBarHeight: 0, // 导航栏高度
    menuRight: 0, // 胶囊距右方间距（方保持左、右间距一致）
    menuTop: 0, // 胶囊距底部间距（保持底部间距一致）
    menuHeight: 0, // 胶囊高度（自定义内容可与胶囊高度保证一致）
    currCity: "全国",
    currDate: "全部时间",
  }
})
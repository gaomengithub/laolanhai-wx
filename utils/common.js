class Common {
  static _instance = null

  constructor() {
    if (Common._instance) return Common._instance

    try {
      this.systemInfo = wx.getSystemInfoSync()
      this.menuButtonInfo = wx.getMenuButtonBoundingClientRect()
      this.init()
    } catch (e) {
      // Do something when catch error
    }

    Common._instance = this
  }
  init() {
    if (!this.systemInfo || !this.menuButtonInfo) return
    this.navBarHeight = this.systemInfo.statusBarHeight + 44;
    this.menuRight = this.systemInfo.screenWidth - this.menuButtonInfo.right;
    this.menuTop = this.menuButtonInfo.top;
    this.menuHeight = this.menuButtonInfo.height;
    this.windowHeight = this.systemInfo.windowHeight;
  }
}

export default Common
import Common from '$/common'

App({
  onLaunch() {
    this.globalData.common = new Common()
  },
  globalData: {
    common: null,
  }
})
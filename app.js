import Common from 'models/common'

App({
  onLaunch() {
    this.globalData.common = new Common()
  },
  globalData: {
    common: null,
  }
})
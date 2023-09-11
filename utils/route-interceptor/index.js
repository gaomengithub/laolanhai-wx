let routeInterceptor = {
  navigateTo(path) {
    try {
      const quals = wx.getStorageSync('quals')
      const arr = quals.map(item => item.qual)
      if (arr.includes(2)) {
        wx.navigateTo({ url: '/pages/sub/user/index?type=create' })
      } else {
        wx.navigateTo({
          url: path,
        })
      }
    } catch {
      console.log("验证权限出错")
    }
  }
}
export default routeInterceptor;
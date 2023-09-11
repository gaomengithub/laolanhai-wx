let routeInterceptor = {
  navigateTo(path) {
    if (path == "/pages/to-do/index") {
      wx.showModal({
        title: '提示',
        content: '该功能正在内测，敬请期待',
        showCancel: false,
        complete: (res) => {
          if (res.confirm) {
          }
        }
      })
    } else {
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
}
export default routeInterceptor;



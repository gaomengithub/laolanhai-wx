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
        if (arr) {
          if (arr.includes(2)) {
            wx.navigateTo({ url: '/pages/sub/user/index?type=create' })
          } else {
            wx.navigateTo({
              url: path,
            })
          }
        } else {
          throw new Error('arr is not defined')
        }
      } catch (e) {
        wx.showModal({
          title: '错误',
          content: '读取权限出错',
          showCancel: false,
          complete: (res) => {
            if (res.confirm) {

            }
          }
        })
      }
    }
  }
}
export default routeInterceptor;



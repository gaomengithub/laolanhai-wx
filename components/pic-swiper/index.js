
Component({

  properties: {
    photos: {
      type: Array,
      value: []
    }
  },

  data: {
    swiperHeight: wx.getSystemInfoSync().windowWidth + 'px',
    swiperImgHeight: wx.getSystemInfoSync().windowWidth + 'px',
    windowWidth: wx.getSystemInfoSync().windowWidth,
  },
  lifetimes: {
    ready() {
      this.swiperChange({
        detail: { current: 0 }
      })
    }
  },
  methods: {
    swiperChange(e) {
      const currImg = this.data.photos[e.detail.current]
      if (currImg) {
        wx.getImageInfo({
          src: currImg,
          success: (res) => {
            let scale = null
            if (res.height >= res.width) {
              scale = this.data.windowWidth * 4 / 3
            } else {
              scale = this.data.windowWidth * 3 / 4
            }
            this.setData({
              swiperImgHeight: scale + 'px',
              swiperHeight: scale + 'px'
            })
          }
        })
      }
    },
  }
})

import routeInterceptor from '$/utils/router'
Component({
  properties: {
    item: {
      type: Object,
      value: {

      }
    }
  },

  data: {
    bgImg: "https://openstore.obabyball.com/ui_v1/img/star-card-bg-img.png",
    personImg: "https://openstore.obabyball.com/ui_v1/img/star-card-bg-img-v1.png",
    leftOffset: '40rpx',
    bottomOffset: '40px',
  },

  methods: {

    translateByClick() {
      count++
      if (count % 2 == 0) {
        this.setData({
          leftOffset: '40rpx',
          bottomOffset: '40px',
        })
      } else {
        this.setData({
          leftOffset: '322rpx',
          bottomOffset: '40px',
        })
      }
    }
  }
})

let count = 0
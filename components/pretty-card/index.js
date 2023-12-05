
Component({
  properties: {
    item: {
      type: Object,
      value: {

      }
    }
  },

  data: {
    img: 'https://openstore.obabyball.com/ui_v1/img/diy-match-tag-img-v1.png'
  },
  lifetimes: {

  },
  methods: {
    onClick() {
      wx.navigateTo({
        url: `/pages/sub/star-page/index?id=${this.data.item.id}`
      })
    }
  }
})

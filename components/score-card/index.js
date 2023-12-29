
Component({
  properties: {
    item: {
      type:Object,
      value:{}
    }
  },

  data: {

  },

  methods: {
    handleClick(e) {
      const path = e.currentTarget.dataset.path
      wx.navigateTo({
        url: path,
      })
    }
  }
})

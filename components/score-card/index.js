
Component({
  properties: {
    joinedNum: {
      type: String,
      value: "0"
    },
    score: {
      type: String,
      value: "-"
    },
    win: {
      type: String,
      value: "0"
    },
    pointer: {
      type: String,
      value: "0"
    }
  },

  data: {

  },

  methods: {
    handleClick(e) {
      const path = e.currentTarget.dataset.path
      console.log(path)
      wx.navigateTo({
        url: path,
      })
    }
  }
})

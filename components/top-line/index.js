Component({
  properties: {
    name: {
      type: String,
      value: "我的"
    },
    more: {
      type: String,
      value: "查看更多"
    }
  },
  data: {

  },
  methods: {
    tiggerCoutomEvent(e) {
      this.triggerEvent('handleButtomClick')
    }
  }
})

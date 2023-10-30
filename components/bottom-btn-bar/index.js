
Component({

  properties: {
    containerBgColor: {
      type: String,
      value: "#FFFFFF"
    },
    btnBgColor: {
      type: String,
      //支持渐变
      value: "#FB8808"
    },
    textColor: {
      type: String,
      value: "#000000"
    },
    name: {
      type: String,
      value: ""
    }
  },

  data: {

  },

  methods: {
    triggerCustomEvent: function (e) {
      this.triggerEvent('handleButtonClick')
    }
  }
})

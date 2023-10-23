// component/active-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    containerBgColor:{
      type:String,
      value:"#FFFFFF"
    },
    btnBgColor:{
      type:String,
      //支持渐变
      value:"#FB8808"
    },
    textColor:{
      type:String,
      value:"#000000"
    },
    name:{
      type:String,
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    triggerCustomEvent:function(e) {
      this.triggerEvent('handleButtonClick')
    }
  }
})

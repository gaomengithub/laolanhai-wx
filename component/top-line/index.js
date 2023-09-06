// component/custom-underline-text/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name:{
      type:String,
      value:"我的"
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
    tiggerCoutomEvent(e){
      this.triggerEvent('handleButtomClick')
    }
  }
})

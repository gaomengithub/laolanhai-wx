

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    joinedNum : {
      type:String,
      value:"-"
    },
    score:{
      type:String,
      value:"-"
    },
    win:{
      type:String,
      value:"-"
    },
    pointer:{
      type:String,
      value:"-"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    arrowDown:iconUrls.mineArrowDown
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onMineMoreBtn(){
      wx.showModal({
        title: '提示',
        content: '功能还在完善中，敬请期待',
        showCancel:false,
        complete: (res) => {
          if (res.confirm) {
            
          }
        }
      })
    }
  }
})

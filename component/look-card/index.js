import { iconUrls } from '$/urls'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String,
      value:"庞各庄老年明星赛"
    },
    name : {
      type:String,
      value:"-测试-"
    },
    avatar :{
      type:String,
      value:"https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg"
    },
    mvpData:{
      type:Object,
      value:{
        scoring:"-",
        rebound:"-",
        assist:"-",
        steal:"-",
        blockShot:"-"
      }
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    mvpIcon:iconUrls.lookMvp
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toMatchDesc(e) {
      wx.showModal({
        title: '提示',
        content: '赛事还未开始，敬请期待',
        showCancel:false,
        complete: (res) => {     
          if (res.confirm) {
            
          }
        }
      })
    },

  }
})

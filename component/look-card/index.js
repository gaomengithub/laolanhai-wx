import { iconUrls ,imgUrls } from '$/urls'
import routeInterceptor from '$/router'

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
      value:"大悦杯"
    },
    avatar :{
      type:String,
      value:"https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg"
    },
    total:{
      type:String,
      value:"16"
    },
    schedule:{
      type:String,
      value:"8/16"
    },
    teamNum:{
      type:Number,
      value:32
    }
    // mvpData:{
    //   type:Object,
    //   value:{
    //     scoring:"-",
    //     rebound:"-",
    //     assist:"-",
    //     steal:"-",
    //     blockShot:"-"
    //   }
    // }

  },

  /**
   * 组件的初始数据
   */
  data: {
    mvpIcon:iconUrls.lookMvp,
    outline:imgUrls.enListAvatarOutlineImg,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toMatchDesc(e) {
      const path = "/pages/sub/details/look/index"
      routeInterceptor.navigateTo(path)
    },

  }
})

// component/apply-card/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name:{
      type:String,
      value:"燕子"
    },
    age:{
      type:Number,
      value:55
    },
    date:{
      type:String,
      value:"2023-08-31"
    },
    comments:{
      type:String,
      value:"我志愿加入"
    },
    avatar:{
      type:String,
      value:"https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg"
    },
    teamID:{
      type:String,
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  lifetimes:{
    attached(){

    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

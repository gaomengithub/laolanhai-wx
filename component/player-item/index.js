// component/player-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    player: {
      type: Object,
      value: {
        avatar: "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg",
        name: "老蓝孩",
        position: "中锋",
        id: "",
      }
    },
    //用来判断是否是该队队长
    teamID: {
      type: String,
      value: ""
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

  }
})

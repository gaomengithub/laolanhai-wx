
Component({
  // options: {
  //   multipleSlots: true 
  // },
  properties: {
    items: {
      type: Array,
      //测试用，需要删除
      value: [
        { type: 3, name: "8.3赛福8-10篮球", status: 0, matchID:"2UTIV7EwXAieSRTGn1YYAG9LKZn" }
      ]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    officialIcon: iconUrls.mineOfficial,
    unOfficialIcon: iconUrls.mineUnofficial,
    linkIcon:iconUrls.tabArrow
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})


Component({
  properties: {
    img: String,
    title: String,
    date: String,
    address: String,
    avatars: Array,
    matchID: String,
    matchType: Number,
    status:String,
    num:Number,
  },
  data: {
    typeClass: "",
    iconUrl:{
      clock:"http://ryt5dzeq0.hn-bkt.clouddn.com/dev/background/clock-oy.svg",
      address:"http://ryt5dzeq0.hn-bkt.clouddn.com/dev/background/adress-oy.svg"
    },
    avatarUrl:[
      "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg",
      "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg",
      "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg",
    ],
    backgroundImageUrl:"http://ryt5dzeq0.hn-bkt.clouddn.com/dev/background/bg-ball-4x.png"
  },
  lifetimes:{
    attached: function () {
      switch (this.data.matchType) {
        case 0:
          this.setData({
            typeClass: 'official'
          });
          break;
        case 3:
          this.setData({
            typeClass: 'unofficial'
          });
          break;
      }
    },
  },

  methods: {

  }
})
import { formatForMatchCard } from '../../utils/util'
import { iconUrls } from '../../utils/urls'
Component({
  properties: {
    img: String,
    name: String,
    date: String,
    location: String,
    matchID: String,
    matchType: Number,
    status: String,
    teams: Array,
    users: Array
  },
  data: {
    imgUrlWithToken: "",
    joinNum: "",
    formatedDate: "",
    typeClass: "",
    iconUrl: {
      clock: iconUrls.matchCardClock,
      address: iconUrls.matchCardLocation
    },
    avatarUrl: [
      "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg",
      "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg",
      "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg",
    ],
    backgroundImageUrl: "https://openstore.obabyball.com/ui_v1/img/match-card-bg-ball-v1.png"
  },
  lifetimes: {
    attached: function () {
      
      this.setData({
        formatedDate: formatForMatchCard(this.data.date)
      })

      this.setData({
        joinNum: this.data.teams.length + this.data.users.length
      })

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
    onJoinBtn() {
      const _this = this
      wx.getStorage({
        key: 'quals',
        success(res) {
          let qual = res.data[0].qual
          if (qual == 2) {
            wx.navigateTo({
              url: '/pages/sub/login/index',
            })
          } else {
            wx.navigateTo({
              url: `/pages/desc/index?matchID=${_this.data.matchID}&matchType=${_this.data.matchType}`,
            })
          }
        },
        fail() {
          wx.navigateTo({
            url: '/pages/sub/login/index',
          })
        }
      })
    }
  }
})
import { formatForMatchCard } from '$/util'
import { iconUrls, imgUrls } from '$/urls'
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
    joinNum: "",
    formatedDate: "",
    formatedLocation: "",
    typeClass: "",
    iconUrl: {
      clock: iconUrls.matchCardClock,
      address: iconUrls.matchCardLocation
    },
    matchCardBgImage: imgUrls.matchCardBgImage
  },
  lifetimes: {
    attached: function () {
      this.setData({
        formatedDate: formatForMatchCard(this.data.date),
        joinNum: this.data.teams.length + this.data.users.length,
        formatedLocation: this.data.location.replace("||", "  ")
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
              url: `/pages/sub/details/match/index?matchID=${_this.data.matchID}&matchType=${_this.data.matchType}`,
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
import { iconUrls } from "../../utils/urls"
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  data: {
    team: {
      icon: iconUrls.addActionUnofficial,
      title: "申请成立球队",
      text: "自己成为队长",
      url: "/pages/sub/create-team/index"
    },
    referee: {
      icon: iconUrls.mineReferee,
      title: "申请成为裁判",
      text: "限有正式者申请",
      url: "/pages/to-do/index"
      // url:"/pages/add-match/index?type=2"
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    navigateTo(e) {
      const url = e.currentTarget.dataset.url
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
              url: url,
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

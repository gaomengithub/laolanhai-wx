import { iconUrls } from "$/urls"
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  data: {
    addList: [
      {
        icon: iconUrls.addActionUnofficial,
        title: "野球局",
        text: "仅限个人参加",
        url: "/pages/sub/diy-match/index?type=3&new=y"
      },
      {
        icon: iconUrls.addActionUnofficial,
        title: "野球战队赛",
        text: "仅限战队参加",
        url: "/pages/to-do/index"
        // url:"/pages/match/index?type=2&new=0"
      },
      {
        icon: iconUrls.addActionOfficial,
        title: "正赛",
        text: "仅限入驻机构组织",
        url: "/pages/to-do/index"
        // url:"/pages/match/index?type=1&new=0"
      }
    ]

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCell(e) {
      const key = e.currentTarget.dataset.key
      if (key == "/pages/to-do/index") {
        wx.showModal({
          title: '提示',
          content: '该功能正在内测，敬请期待',
          showCancel: false,
          complete: (res) => {
            if (res.confirm) {
            }
          }
        })
      } else {
        wx.navigateTo({
          url: key,
        })
      }
    }
  }
})

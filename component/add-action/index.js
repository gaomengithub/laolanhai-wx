import { iconUrls } from "$/urls"
import routeInterceptor from '$/router'

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  data: {
    greyArrow: iconUrls.greyArrow,
    blackArrow: iconUrls.blackArrow,
    official: {
      icon: iconUrls.addActionOfficial,
      title: "正赛",
      text: "仅限入驻机构组织",
      url: "/pages/to-do/index"
      // url:"/pages/match/index?type=1&new=0"
    },
    diyPerson: {
      icon: iconUrls.addActionUnofficial,
      title: "野球局",
      text: "仅限个人参加",
      url: "/pages/sub/diy-match/index?type=3&new=y"
    },
    diyTeam: {
      icon: iconUrls.addActionUnofficial,
      title: "野球战队赛",
      text: "仅限战队参加",
      url: "/pages/to-do/index"
      // url:"/pages/match/index?type=2&new=0"
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClick(e) {
      const path = e.currentTarget.dataset.path
      routeInterceptor.navigateTo(path)
    }
  }
})

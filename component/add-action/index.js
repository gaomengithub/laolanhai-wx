import { iconUrls } from "../../utils/urls"
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  data: {
    addList:[
      {
        icon:iconUrls.addActionUnofficial,
        title:"野球局",
        text:"仅限个人参加",
        url:"/pages/add-match/index?type=3"
      },
      {
        icon:iconUrls.addActionUnofficial,
        title:"野球战队赛",
        text:"仅限战队参加",
        url:"/pages/add-match/index?type=2"
      },
      {
        icon:iconUrls.addActionOfficial,
        title:"正赛",
        text:"仅限入驻机构组织",
        url:"/pages/add-match/index?type=1"
      }
    ]

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

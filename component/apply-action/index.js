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
        title:"申请成立球队",
        text:"自己成为队长",
        url:"/pages/add-team/index"
      },
      {
        icon:iconUrls.mineReferee,
        title:"申请成为裁判",
        text:"限有正式者申请",
        url:"/pages/add-match/index?type=2"
      },
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

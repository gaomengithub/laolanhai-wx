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
    manager: {
      icon: iconUrls.addActionUnofficial,
      title: "申请成为大区旋风",
      text: "管理大区相关事务",
    },
    referee: {
      icon: iconUrls.mineReferee,
      title: "申请成为裁判",
      text: "限有裁判资格者申请",
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClick(e){
      const path = e.currentTarget.dataset.path
      routeInterceptor.navigateTo(path)
    }
  }
})

import { imgUrls } from '$/urls'
import routeInterceptor from '$/router'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    team: {
      type: Object,
      value: {
        name:"老蓝孩",
        logo:"",
        id:"",
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    bgImg: imgUrls.enListBgImg,
    avatarOutline: imgUrls.enListAvatarOutlineImg,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onBtnClick(e) {
      const teamID = e.currentTarget.dataset.id
      const path = `/pages/sub/team-details/index?id=${teamID}`
      routeInterceptor.navigateTo(path)
    }
  }
})

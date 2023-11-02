
import routeInterceptor from '$/utils/router'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    teams: {
      type: Object,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    img: 'https://openstore.obabyball.com/ui_v1/img/enlist-bg-img-v2.svg',
    avatarOutline: 'https://openstore.obabyball.com/ui_v1/img/enlist-avatar-outline-v1.svg',
  },


  methods: {
    onBtnClick(e) {
      const teamID = e.currentTarget.dataset.id
      const path = `/pages/sub/team-details/index?id=${teamID}`
      routeInterceptor.navigateTo(path)
    }
  }
})

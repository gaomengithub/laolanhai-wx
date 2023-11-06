import routeInterceptor from '$/utils/router'
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  data: {
    greyArrow: 'https://openstore.obabyball.com/ui_v1/icon/arrow-grey.svg',
    blackArrow: 'https://openstore.obabyball.com/ui_v1/icon/arrow-black.svg',
    manager: {
      // icon: iconUrls.addActionUnofficial,
      title: "申请成为大区旋风",
      text: "管理大区相关事务",
    },
    referee: {
      icon: 'https://openstore.obabyball.com/ui_v1/icon/mine-referee-v1.svg',
      title: "申请成为裁判",
      text: "限有裁判资格者申请",
    },
  },

  methods: {
    onClick(e){
      const path = e.currentTarget.dataset.path
      routeInterceptor.navigateTo(path)
    }
  }
})

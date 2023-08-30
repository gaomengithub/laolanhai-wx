import { iconUrls } from '../../utils/urls'
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    searchIcon: iconUrls.tabSearch,
    arrowIcon: iconUrls.tabArrow,
    currCity: "",
    currDate: ""
  },

  pageLifetimes: {
    show: function () {
      this.setData({
        currCity: getApp().globalData.currCity,
        currDate: getApp().globalData.currDate
      })
    }
  },

  methods: {

  }
})

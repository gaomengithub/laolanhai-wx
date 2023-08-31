import { imgUrls } from '../../utils/urls'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: String,
    num: Number,
    avatar: String,
    teamID: String
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
      console.log(e)
      const teamID = e.currentTarget.dataset.id
      wx.navigateTo({
        url: `/pages/sub/details/team/index?id=${teamID}`,
      })
    }
  }
})

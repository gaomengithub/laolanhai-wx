import { imgUrls } from '../../utils/urls'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: String,
    num: Number,
    avatar: String,
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
    
  }
})

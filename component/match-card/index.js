import {request} from '../../utils/http'


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    img: String,
    title: String,
    date: String,
    address: String,
    avatars: Array,
    matchID:String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  methods:{




    
    toDescPage(e){
      let obj = {
        method: "POST",
        url:"/user/login",
      }
      request(obj).then(res=>{

      }).catch(res=>{

      })
      // console.log(e.currentTarget.dataset.id)
      // wx.navigateTo({
      //   url: '/pages/desc/index'
      // })
    }
  }
})
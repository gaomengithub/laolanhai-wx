import { handleErr } from "../modules/msgHandler"
import { user } from "$/stores/user-store"

const orgItems = [
  '/pages/sub/match-form/index?page=new&match_type=1'
]


let routeInterceptor = {
  navigateTo(path) {
    if (orgItems.includes(path) && !user.isOrg) {
      handleErr("只有特定的组织者能够组织正赛", wx.navigateBack)
      return
    }

    try {
      if (!user.isUser) {
        wx.navigateTo({ url: '/pages/sub/user-form/index?type=create' })
      } else {
        wx.navigateTo({
          url: path,
        })
      }
    } catch (e) {
      handleErr("路由未知错误")
    }
  }

}
export default routeInterceptor;



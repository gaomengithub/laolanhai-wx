import { handleErr, handleInfo } from "../modules/msgHandler"
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

    if (path == '/pages/sub/match-form/index?page=new&match_type=2' && !user.isTeamLeader) {
      handleErr("只有队长能够组织战队赛", wx.navigateBack)
      return
    }

    try {
      if (!user.isUser) {
        handleInfo("您需要先进行注册", function () {
          wx.navigateTo({ url: '/pages/sub/user-form/index?page=create' })
        })
      } else {
        wx.navigateTo({
          url: path,
        })
      }
    } catch (e) {
      handleErr("权限错误，请重试")
      user.updateUserInfo()
    }
  }

}
export default routeInterceptor;



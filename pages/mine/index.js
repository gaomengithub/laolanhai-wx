import { imgUrls, iconUrls } from '$/urls'
import { createStoreBindings } from "mobx-miniprogram-bindings";
import { user } from "../../stores/user-store"

Page({
  data: {
    userID: "",
    items: [],
    lightImg: imgUrls.mineLightImg,
    teamIcon: iconUrls.mineTeam,
    applyIcon: iconUrls.mineApply,
    inIcon: iconUrls.mineIn,
    editIcon: iconUrls.editIcon,
    showPopup: false,
    closeIcon: iconUrls.barClose,

  },
  onCellClick(e) {
    // const key  = e.currentTarget.key
    wx.showModal({
      title: '提示',
      content: '该功能还在内测阶段，敬请期待',
      showCancel: false,
      complete: (res) => {
        if (res.confirm) {

        }
      }
    })
  },
  onClosePopup() {
    this.setData({
      showPopup: false
    })
  },
  showPopup() {
    this.setData({
      showPopup: true
    })
  },
  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },
  onLoad() {
    this.storeBindings = createStoreBindings(this, {
      store: user,
      fields: ["userInfo"],
      actions: ["updateUserInfo","updateMatches"],
    })
    this.updateUserInfo()
    this.updateMatches()


    // getMyJoinMatch().then(res => {
    //   this.setData({
    //     items: res.data.matches
    //   })
    // })
    // getMatchApprovalList().then(res=>{
    //   console.log(res)
    // })
  },


  onShow() {

    //tabbar
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 4
      })
    }
  },

})
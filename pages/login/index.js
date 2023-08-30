import WxValidate from '../../utils/WxValidate'
import { updateUserInfo } from '../../utils/api'
import { uploadImgWithToken } from '../../utils/qiniu'
const computedBehavior = require('miniprogram-computed').behavior
const app = getApp()
Page({
  behaviors: [computedBehavior],
  data: {
    avatarUrl: "",
    navTitle: "完善资料",
    navBarHeight: app.globalData.navBarHeight,
    nickName: "",
    disabled: true,
    showNameTip: false,
    showAvatarTip: false
  },
  watch: {
    'avatarUrl, nickName': function (a, n) {
      if (a.length > 0 && n.length > 0) {
        this.setData({
          disabled: false
        })
      }
    }
  },
  validate(e) {
    const key = e.currentTarget.dataset.key
    let data = null
    if (key == "showNameTip") {
      data = {
        nickName: this.data.nickName,
        avatarUrl: "stand"
      }
    }

    if (key == "showAvatarTip") {
      data = {
        nickName: 'stand',
        avatarUrl: this.data.avatarUrl
      }
    }

    if (!this.WxValidate.checkForm(data)) {
      this.setData({
        [key]: true
      })
    } else {
      this.setData({
        [key]: false,
      })
    }
  },

  getPhoneNumber(e) {
    wx.showToast({
      title: '请等待',
      icon: 'loading',
      mask: true,
      duration: 1000
    })
    uploadImgWithToken(this.data.avatarUrl).then(url => {
      const userData = {
        id: wx.getStorageSync('id'),
        nickName: this.data.nickName,
        phoneCode: e.detail.code,
        avatar: url.key
      }
      updateUserInfo(userData).then(() => {
        wx.showModal({
          content: '注册成功',
          showCancel: false,
          complete: (res) => {
            if (res.confirm) {
              wx.switchTab({
                url: '/pages/home/index',
              })
            }
          }
        })
      })
    }
    ).catch(e => {
      console.log('上传头像失败')
    })



  },
  onChooseAvatar(e) {
    console.log(e)
    const { avatarUrl } = e.detail
    this.setData({
      avatarUrl,
      showAvatarTip: false
    })
  },
  initValidate() {
    const rules = {
      avatarUrl: {
        required: true
      },
      nickName: {
        required: true
      },
    }
    const messages = {
      avatarUrl: {
        required: '需要选择头像'
      },
      nickName: {
        required: '昵称不能为空'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.initValidate();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
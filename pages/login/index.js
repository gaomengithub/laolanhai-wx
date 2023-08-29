import WxValidate from '../../utils/WxValidate'
import { updateUserInfo } from '../../utils/api'
import { uploadImgWithToken } from '../../utils/qiniu'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: "",
    navTitle: "完善资料",
    navBarHeight: app.globalData.navBarHeight,
    nickName: "",
  },


  getPhoneNumber(e) {
    //校验表单
    const data = {
      nickName: this.data.nickName,
      avatarUrl: this.data.avatarUrl
    }
    if (!this.WxValidate.checkForm(data)) {
      const error = this.WxValidate.errorList[0];
      wx.showModal({
        content: error.msg,
        showCancel: false
      })
      return false;
    } else {
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


    }
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    this.setData({
      avatarUrl,
    })
  },
  initValidate() {
    const rules = {
      nickName: {
        required: true
      },
      avatarUrl: {
        required: true
      },
    }
    const messages = {
      nickName: {
        required: '昵称不能为空'
      },
      avatarUrl: {
        required: '需要选择头像'
      },
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
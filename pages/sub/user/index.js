import WxValidate from '$/WxValidate'
import { updateUserInfo, getUserInfoByID } from '$/api'
import { uploadImgWithToken } from '$/qiniu'
import { formatDate, revertQiniuKey } from '$/util'
const computedBehavior = require('miniprogram-computed').behavior
// const app = getApp()
Page({
  behaviors: [computedBehavior],
  data: {
    type: "create",
    userData: "",
    avatarUrl: "",
    avatarKey: "",
    navTitle: "完善资料",
    // navBarHeight: app.globalData.navBarHeight,
    nickName: "",
    height: "172cm",
    weight: "80kg",
    about: "",
    heightColumns: [{ values: ["140cm", "141cm", "142cm", "143cm", "144cm", "145cm", "146cm", "147cm", "148cm", "149cm", "150cm", "151cm", "152cm", "153cm", "154cm", "155cm", "156cm", "157cm", "158cm", "159cm", "160cm", "161cm", "162cm", "163cm", "164cm", "165cm", "166cm", "167cm", "168cm", "169cm", "170cm", "171cm", "172cm", "173cm", "174cm", "175cm", "176cm", "177cm", "178cm", "179cm", "180cm", "181cm", "182cm", "183cm", "184cm", "185cm", "186cm", "187cm", "188cm", "189cm", "190cm", "191cm", "192cm", "193cm", "194cm", "195cm", "196cm", "197cm", "198cm", "199cm", "200cm"], defaultIndex: 28 }],
    weightColumns: [{ values: ["40kg", "41kg", "42kg", "43kg", "44kg", "45kg", "46kg", "47kg", "48kg", "49kg", "50kg", "51kg", "52kg", "53kg", "54kg", "55kg", "56kg", "57kg", "58kg", "59kg", "60kg", "61kg", "62kg", "63kg", "64kg", "65kg", "66kg", "67kg", "68kg", "69kg", "70kg", "71kg", "72kg", "73kg", "74kg", "75kg", "76kg", "77kg", "78kg", "79kg", "80kg", "81kg", "82kg", "83kg", "84kg", "85kg", "86kg", "87kg", "88kg", "89kg", "90kg", "91kg", "92kg", "93kg", "94kg", "95kg", "96kg", "97kg", "98kg", "99kg", "100kg"], defaultIndex: 18 }],
    showDatePicker: false,
    showWeightPicker: false,
    showHeightPicker: false,
    date: new Date('1966-04-25').getTime(),
    currentDate: "",
    minDate: new Date('1949-01-01').getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      }
      if (type === 'month') {
        return `${value}月`;
      }
      return `${value}日`;
    },
    disabled: true,
    showNameTip: false,
    showAvatarTip: false
  },
  onInput(event) {
    this.setData({
      date: event.detail,
      currentDate: formatDate(new Date(event.detail)),
    });
  },
  onChange(e) {
    const type = e.currentTarget.dataset.type
    this.setData({
      [type]: e.detail.value[0]
    })
  },
  watch: {
    'avatarUrl, nickName': function (a, n) {
      if (a.length > 0 && n.length > 0) {
        this.setData({
          disabled: false
        })
      }
      if (a.length == 0 || n.length == 0) {
        this.setData({
          disabled: true
        })
      }
    }
  },
  validate(e) {
    // 头像填写的验证的折中方法
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
  onClose(e) {
    const key = e.currentTarget.dataset.key
    this.setData({
      [key]: false
    })
  },

  onDisplay(e) {
    const key = e.currentTarget.dataset.key
    this.setData({
      [key]: true
    })
  },

  getPhoneNumber(e) {
    wx.showLoading({
      title: '请等待',
    })
    const userData = {
      id: wx.getStorageSync('id'),
      nickName: this.data.nickName,
      phoneCode: e.detail.code,
      avatar: this.data.avatarKey
    }
    updateUserInfo(userData).then(() => {
      wx.hideLoading()
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
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    this.setData({
      avatarUrl,
      showAvatarTip: false
    })
    uploadImgWithToken(avatarUrl).then(url => {
      this.setData({
        avatarKey: url.key
      })
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
    const type = options.type
    if (type == "create") return
    if (type == "modify") {
      const userID = options.id
      getUserInfoByID(userID).then(res => {
        console.log(res)
        this.setData({
          type,
          avatarUrl: res.data.avatar,
          nickName: res.data.nickName,
          about: res.data.about == undefined ? "" : res.data.about,
          weight: res.data.weight == undefined ? "" : res.data.weight,
          height: res.data.about == undefined ? "" : res.data.height,
          birthDate: res.data.birthDate == undefined ? "" : res.data.birthDate
        })

      })
    }
  },
  onUpdateUserInfo() {
    const userData = {
      id: wx.getStorageSync('id'),
      nickName: this.data.nickName,
      avatar: revertQiniuKey(this.data.avatarUrl),
      about: this.data.about,
      birthDate: this.data.currentDate,
      height: this.data.height,
      weight: this.data.weight,
    }
    updateUserInfo(userData).then(res => {
      wx.showModal({
        title: '提示',
        content: '更新成功',
        showCancel: false,
        complete: (res) => {
          if (res.confirm) {
            wx.navigateBack()
          }
        }
      })
    })
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
import { getMatchDesc, joinMatch } from '$/api'
import { iconUrls } from '$/urls'

Page({
  data: {
    navTitle: "老蓝孩俱乐部",
    matchID: "",
    match: {},
    isUser: false,
    swiperImgHeight: wx.getSystemInfoSync().windowWidth + 'px',
    swiperHeight: wx.getSystemInfoSync().windowWidth + 'px',
    editUrl: iconUrls.edit,
    typeUrl: iconUrls.descUnofficialTag,
    clockUrl: iconUrls.descClock,
    locationUrl: iconUrls.descLocation,
    octagonalStar: iconUrls.octagonalStar,
    windowWidth: wx.getSystemInfoSync().windowWidth,
    navBarHeight: getApp().globalData.navBarHeight,
  },

  onJoinBtn() {
    console.log("e")
    wx.showLoading({
      title: '请等待',
      mask: true,
    })
    if (this.data.matchID != "" || this.data.matchID != null) {
      joinMatch(this.data.matchID).then(() => {
        wx.hideLoading()
        wx.showModal({
          title: '报名成功',
          content: '您已成功报名，请准时参加',
          showCancel: false,
          complete: (res) => {
            if (res.confirm) {
              this.onLoad()
            }
          }
        })
      }).catch(e => {
        if (e.statusCode == 400) {
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: '您已经报过名，请勿重新报名',
            showCancel: false,
            complete: (res) => {
              if (res.confirm) {
                // wx.navigateBack()
              }
            }
          })
        }
      })
    }
  },
  swiperChange(e) {
    const ls = [this.data.match.banner_attachments, ...this.data.match.attachments]
    const currImg = ls[e.detail.current]

    wx.getImageInfo({
      src: currImg,
      success: (res) => {
        let scale = null
        if (res.height >= res.width) {
          scale = this.data.windowWidth * 4 / 3
        } else {
          scale = this.data.windowWidth * 3 / 4
        }
        this.setData({
          swiperImgHeight: scale + 'px',
          swiperHeight: scale + 'px'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    try {
      this.setData({
        matchID: options.matchID,
        typeUrl: [iconUrls.descOfficialTag, iconUrls.descOfficialTag, iconUrls.descUnofficialTag][options.matchType - 1]
      })
    } catch (e) {
      console.log("获取比赛ID失败")
    }
    this.loadMatchDesc(options.matchID)


  },
  loadMatchDesc(matchID) {
    getMatchDesc(matchID).then(res => {
      //判断是不是已经报名
      const id = wx.getStorageSync('id')
      const ls = res.data.users.map(item => item.id)
      this.setData({
        match: res.data,
        isUser: ls.includes(id)
      }, (() => {
        const e = {
          detail: { current: 0 }
        }
        this.swiperChange(e)
      }))
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
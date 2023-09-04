import { getMatchDesc, joinMatch } from '$/api'
import { iconUrls } from '$/urls'

Page({
  data: {
    navTitle: "老蓝孩俱乐部",
    matchID: "",
    match: {},
    swiperImgHeight: wx.getSystemInfoSync().windowWidth + 'px',
    swiperHeight: wx.getSystemInfoSync().windowWidth + 'px',
    showDialog: false,
    // dialogIconType: "success",
    // dialogMsg: "报名成功",
    typeUrl: iconUrls.descUnofficialTag,
    clockUrl: iconUrls.descClock,
    locationUrl: iconUrls.descLocation,
    octagonalStar:iconUrls.octagonalStar,
    windowWidth: wx.getSystemInfoSync().windowWidth,
    navBarHeight: getApp().globalData.navBarHeight,
  },
  // onDialogConfirmBtn() {
  //   this.setData({
  //     showDialog: false,
  //   })
  //   wx.navigateBack()
  // },
  onJoinBtn() {
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
          showCancel:false,
          complete: (res) => {        
            if (res.confirm) {
              wx.navigateBack()
            }
          }
        })
        // this.setData({
        //   dialogIconType: "success",
        //   showDialog: true,
        //   dialogMsg: "报名成功"
        // })
      }).catch(e => {
        if (e.statusCode == 400) {
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: '您已经报过名，请勿重新报名',
            showCancel:false,
            complete: (res) => {          
              if (res.confirm) {
                wx.navigateBack()
              }
            }
          })
          // this.setData({
          //   dialogIconType: "info",
          //   showDialog: true,
          //   dialogMsg: "您已经报过名，无需再报名"
          // })
        }
      })
    }
  },
  swiperChange(e) {
    const ls = [this.data.match.banner_attachments, this.data.match.attachments]
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

    getMatchDesc(options.matchID).then(res => {
      res.data.start_time = res.data.start_time.replace(":00+08:00", "").replace("T", "  ")
      res.data.location = res.data.location.replace("||", "  ")
      this.setData({
        match: res.data
      }, (() => {
        const e = {
          detail: { current: 0 }
        }
        this.swiperChange(e)
      }))
    }).catch(e => {
      console.log(e)
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
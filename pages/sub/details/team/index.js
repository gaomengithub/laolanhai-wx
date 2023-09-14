import { getTeamDesc, joinTeam } from '$/api'
import { imgUrls, iconUrls } from '$/urls'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrow: iconUrls.tabArrow,
    items: {},
    active: 0,
    teamID: "",
    // showComments: false,
    comments: "",
    autosize: { minHeight: 50 },
    bgImg: imgUrls.detailTeamBgImg,
    navTitle: "球队详情",
  },
  onChange(e) {
    const active = e.currentTarget.dataset.active
    this.setData({
      active
    })
  },
  onJoinBtn() {
    wx.showModal({
      title: '填写申请',
      placeholderText: '输入想给队长的信息',
      editable: true,
      complete: (res) => {
        if (res.cancel) {

        }
        if (res.confirm) {
          joinTeam(this.data.items.id, res.content).then(() => {
            wx.showModal({
              title: '提示',
              content: '申请成功，请等待队长审批',
              showCancel: false,
              complete: (res) => {
                if (res.cancel) {

                }

                if (res.confirm) {

                }
              }
            })


          }).catch(e => {
            if (e.statusCode == 400) {
              wx.showModal({
                title: '错误',
                content: '您的申请正在审批中',
                showCancel: false,
                complete: (res) => {
                  if (res.cancel) {

                  }

                  if (res.confirm) {

                  }
                }
              })
            }
          })
        }
      }
    })
  },
  loadTeamDesc(teamID) {
    teamID = teamID == undefined ? this.data.teamID : teamID
    getTeamDesc(teamID).then(res => {
      this.setData({
        items: res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    try {
      const teamID = options.id
      if (teamID != undefined) {
        this.loadTeamDesc(teamID)
        this.setData({
          teamID
        })
      }
    } catch (e) {
      console.log("获取id失败")
    }
    const { globalData } = getApp()
    globalData.setEvent('ON_TEAM_CHANGE', this.loadTeamDesc);
  },
  onUnload() {
    const { globalData } = getApp();
    globalData.removeEvent('ON_TEAM_CHANGE', this.loadTeamDesc);
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
    // this.loadTeamDesc(this.data.teamID)
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
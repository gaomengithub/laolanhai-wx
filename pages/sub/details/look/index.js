import { iconUrls } from '$/urls'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picShow:false,
    editIcon: iconUrls.editIcon,
    activeNames: ['1'],
    showFileList: [
      { url: "https://openstore.obabyball.com/ui_v1/img/look_5.jpg", deletable: false, },
      { url: "https://openstore.obabyball.com/ui_v1/img/look_4.jpg", deletable: false, },
      { url: "https://openstore.obabyball.com/ui_v1/img/look_3.jpg", deletable: false, },
      { url: "https://openstore.obabyball.com/ui_v1/img/look_2.jpg", deletable: false, },
      { url: "https://openstore.obabyball.com/ui_v1/img/look_1.jpg", deletable: false, },
    ],
    maxCount: 5,
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
      picShow:event.detail.includes('2')
    });
  },
  onEditClick() {
    const temp = this.data.showFileList
    this.setData({
      showFileList:null,
      maxCount: 8
    },()=>{
      setTimeout(() => {
        this.setData({
          showFileList: temp
        })
      }, 1)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
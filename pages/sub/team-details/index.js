import { getTeamDesc, joinTeam } from '$/api'
import { imgUrls, iconUrls } from '$/urls'
import { createStoreBindings } from "mobx-miniprogram-bindings";
import { team } from "../../../stores/team-store"
Page({

  data: {
    arrow: iconUrls.tabArrow,
    items: {},
    active: 0,
    teamID: "",
    // showComments: false,
    comments: "",
    autosize: { minHeight: 50 },
    bgImg: imgUrls.detailTeamBgImg,

  },
  onChange(e) {
    const active = e.currentTarget.dataset.active
    this.setData({
      active
    })
  },
  // onJoinBtn() {
  //   wx.showModal({
  //     title: '填写申请',
  //     placeholderText: '输入想给队长的信息',
  //     editable: true,
  //     complete: (res) => {
  //       if (res.cancel) {

  //       }
  //       if (res.confirm) {
  //         joinTeam(this.data.items.id, res.content).then(() => {
  //           wx.showModal({
  //             title: '提示',
  //             content: '申请成功，请等待队长审批',
  //             showCancel: false,
  //             complete: (res) => {
  //               if (res.cancel) {

  //               }

  //               if (res.confirm) {

  //               }
  //             }
  //           })


  //         }).catch(e => {
  //           if (e.statusCode == 400) {
  //             wx.showModal({
  //               title: '错误',
  //               content: '您的申请正在审批中',
  //               showCancel: false,
  //               complete: (res) => {
  //                 if (res.cancel) {

  //                 }

  //                 if (res.confirm) {

  //                 }
  //               }
  //             })
  //           }
  //         })
  //       }
  //     }
  //   })
  // },



  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store: team,
      fields: ["teamDetails","isInTeam"],
      actions: ["updateTeamDetails", "updateTeamApprovals"],
    });
    const id = options.id
    if (id) {
      this.updateTeamApprovals(id)
      this.updateTeamDetails(id)
    }
  },

  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },
})
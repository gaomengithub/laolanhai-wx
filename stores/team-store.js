import { observable, action } from "mobx-miniprogram"
import { getTeamsList, getTeamDesc, getTeamApprovalList, updateApproval } from '$/api'
import { handleErr } from '../modules/msgHandler'
export const team = observable({
  teamDetails: {

  },
  teamApprovals: null,
  teams: [],

  get isInTeam() {
    const id = wx.getStorageSync('id')
    let ids = this.teamDetails.teamMember.map(item => item.id)
    return ids.includes(id)
  },
  get myTeams() {
    let filteredTeams = this.teams.filter(item => item.isMyTeam)
    return filteredTeams
  },
  get notMyTeams() {
    let filteredTeams = this.teams.filter(item => !item.isMyTeam)
    return filteredTeams
  },

  activeApprove: action(async function (obj) {
    wx.showModal({
      title: '填写回执',
      placeholderText: "填写同意或者驳回的理由",
      editable: true,
      complete: async (res) => {
        if (res.cancel) {

        }
        if (res.confirm) {
          wx.showLoading({
            title: '请等待',
          })
          await updateApproval(obj)
          this.updateTeamApprovals(obj.id)
          wx.hideLoading()
        }
      }
    })
  }),



  updateTeamApprovals: action(async function (id) {
    try {
      const data = await getTeamApprovalList(id)
      if (data) {
        const ids = data.map(item => item.Applier.ID)
        //临时方案
      }
      this.teamApprovals = data
      console.log(this.teamApprovals)
    } catch (e) {

    }
  }),

  updateTeamDetails: action(async function (id) {
    if (id) {
      try {
        const data = await getTeamDesc(id)
        this.teamDetails = data
      } catch (e) {

      }
    }
  }),

  updateTeams: action(async function () {
    const data = await getTeamsList()
    this.teams = data.items
  })
})
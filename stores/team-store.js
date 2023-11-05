import { observable, action } from "mobx-miniprogram"
import { getTeamsList, getTeamDesc, getTeamApprovalList, updateApproval } from '$/utils/api'
import { handleErr } from '../modules/msgHandler'
import { uploadImgWithToken } from '$/utils/qiniu/qiniu'
export const team = observable({
  teamDetails: {

  },
  teamForm: null,
  teamApprovals: null,
  teams: [],

  initTeamForm: action(async function (params) {
    let backup = JSON.parse(JSON.stringify(teamFormBackup));
    this.teamForm = JSON.parse(JSON.stringify(backup));

    // this.matchForm = { ...this.matchForm, ...patch }
  }),

  updateTeamForm: action(async function (params) {
    // 更新图片
    if (params.tempFilePath) {
      var _this = this
      wx.compressImage({
        src: params.tempFilePath,
        quality: 10,
        success: async function (res) {
          const data = await uploadImgWithToken(res.tempFilePath)
          const item = { url: params.tempFilePath, isImage: true }
          _this.teamForm.files.push({ ...data, ...item })
          // 部分更新
          _this.teamForm = Object.assign({}, _this.teamForm, { files: _this.teamForm.files })
        }
      })
    }
    // 删除图片
    else if (typeof params === 'number') {
      this.teamForm.files.splice(params, 1)
      this.teamForm = Object.assign({}, this.teamForm, { files: this.teamForm.files })
    }
    // 修改比赛，需要先获得比赛信息，修改form
    else if (typeof params === 'string') {
      try {
        const data = await getTeamDesc(params)
        console.log(data)
        this.teamForm = { ...this.teamForm, ...data, ...patch }
      } catch (e) {
        handleErr("修改比赛，获得球队信息失败")
      }
    }
    // 更新其他字段
    else {
      this.teamForm = { ...this.teamForm, ...params }
    }
  }),

  get isInTeam() {
    const id = wx.getStorageSync('id')
    if (this.teamDetails.teamMember) {
      let ids = this.teamDetails.teamMember.map(item => item.id)
      return ids.includes(id)
    }
  },
  get myTeams() {
    let filteredTeams = this.teams.filter(item => item.isMyTeam)
    return filteredTeams.length > 0 ? filteredTeams : false;
  },
  get notMyTeams() {
    let filteredTeams = this.teams.filter(item => !item.isMyTeam)
    return filteredTeams.length > 0 ? filteredTeams : false;
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

let teamFormBackup = {
  // 自有字段
  files: [],
  name: '',
  city: '',
  desc: '',
  id: '',
  logo: '',
  number: '',
  region: ''
}
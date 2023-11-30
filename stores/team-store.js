import { observable, action } from "mobx-miniprogram"
import { getTeamsList, getTeamDesc, getTeamApprovalList, updateApproval, createTeam, updateTeam, joinTeam } from '$/utils/api'
import { handleErr, handleInfo } from '../modules/msgHandler'
import { uploadImgWithToken } from '$/utils/qiniu/qiniu'
import { teamFormMessages, teamFormRules } from '$/utils/validate/validate-set'
import WxValidate from '$/utils/validate/WxValidate'
export const team = observable({
  validate: new WxValidate(teamFormRules, teamFormMessages),
  teamDetails: {
  },
  teamForm: null,
  teamApprovals: null,
  teamsList: [],

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
          _this.teamForm.files = [{ ...data, ...item }]
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
        const [region, address] = data.region.split("||")
        const patch = {
          region,
          address,
          files: [{ url: data.logo, isImage: true, key: data.logoKey }]
        }
        this.initTeamForm()
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
    let filteredTeams = this.teamsList.filter(item => item.isMyTeam)
    return filteredTeams.length > 0 ? filteredTeams : false;
  },
  get notMyTeams() {
    let filteredTeams = this.teamsList.filter(item => !item.isMyTeam)
    return filteredTeams.length > 0 ? filteredTeams : false;
  },

  /**
   * @param { string } id  队伍id
   */
  joinTeam: action(async function (id,jerseyNumber) {
    try {
      const data = {
        team_id: id,
        jerseyNumber: jerseyNumber
      }
      await joinTeam(data)
      handleInfo("申请成功")
      // this.updateTeamDetails(id)
    } catch (e) {
      if (e.statusCode == '400') {
        handleInfo("已经在审批中，请勿反复加入")
      } else {
        handleErr("加入队伍发生错误，请重试")
      }
    }
  }),
  activeApprove: action(async function (obj) {
    wx.showModal({
      title: '填写回执',
      placeholderText: "填写同意或者驳回的理由",
      editable: true,
      complete: async (res) => {
        if (res.cancel) {

        }
        if (res.confirm) {
          await updateApproval(obj)
          this.updateTeamApprovals(this.teamDetails.id)
          this.updateTeamDetails(this.teamDetails.id)
        }
      }
    })
  }),

  activeTeam: action(async function () {
    const patch = {
      imgCount: this.teamForm.files.length,
      region: this.teamForm.region + '||' + this.teamForm.address,
      logo: this.teamForm.files[0].key
    }
    const form = { ...this.teamForm, ...patch }
    if (!this.validate.checkForm(form)) {
      const error = this.validate.errorList[0];
      handleErr(error.msg)
    }
    // 如果表单校验合格后
    else {
      if (!this.teamForm.id) {
        //新建
        try {
          await createTeam(form)
          handleInfo("创建成功", wx.navigateBack)
          this.updateTeamsList()
        } catch (e) {
          handleErr("创建比赛失败")
        }
      }
      // 修改
      else {
        try {
          await updateTeam(form)
          // 即时刷新
          this.updateTeamDetails(this.teamForm.id)
          handleInfo("修改成功", wx.navigateBack)
        } catch (e) {
          handleErr("修改比赛失败")
        }
      }
    }
  }),



  updateTeamApprovals: action(async function (id) {
    try {
      const data = await getTeamApprovalList(id)
      this.teamApprovals = data
    } catch (e) {
      handleErr("获取队伍审批列表失败")
    }
  }),

  updateTeamDetails: action(async function (id) {
    if (id) {
      try {
        const data = await getTeamDesc(id)
        this.teamDetails = data
      } catch (e) {
        handleErr("获得球队详情失败")
      }
    }
  }),

  updateTeamsList: action(async function () {
    const data = await getTeamsList()
    this.teamsList = data.items
  })
})

let teamFormBackup = {
  // 自有字段
  files: [],
  address: '',

  name: '',
  city: '',
  desc: '',
  id: '',
  logo: '',
  number: '',
  region: ''
}
import { observable, action } from "mobx-miniprogram"
import { getUserInfo, getMyJoinMatches, getMatchApprovals } from '$/api'
import { uploadImgWithToken } from '$/qiniu/qiniu'
import { handleErr } from '../modules/errorHandler'
export const user = observable({

  approvals: [],
  matches: [], // 用户创建的比赛
  user: {
    about: '',
    avatar: '',
    birthDate: '',
    height: '',
    honors: '',
    id: '',
    nickName: '',
    weight: '',
    avatarKey: '',
  },

  get id() {
    let id = wx.getStorageSync('id')
    if (id) {
      return id
    }
    else {
      handleErr("获取id错误")
    }
  },

  get isUser() {
    const quals = this.user.quals.map(item => item.qual)
    return !quals.includes(2)
  },

  get tags() {
    const quals = this.user.quals.map(item => item.qual)
    if (quals) {
      const tags = {
        isTeamLeader: quals.includes(4)
      }
      return tags
    }
    else {
      handleErr("获取tags错误")
    }
  },

  updateApprovals: action(async function () {
    // const data = await getMatchApprovals()

  }),
  updateUserMatches: action(async function () {
    const data = await getMyJoinMatches()
    this.matches = data.matches
  }),

  updateUserInfo: action(async function (form) {
    if (form) {
      if (form.avatarUrl) {
        // 修改头像
        const data = await uploadImgWithToken(form.avatarUrl)
        this.user.avatarKey = data.key
        // this.user.avatar = 
        this.user = Object.assign({}, this.user, { avatar: form.avatarUrl })
      }
      else {
        this.user = { ...this.user, ...form }
      }
    }
    else {
      try {
        const data = await getUserInfo()
        this.user = data
        // 临时
        if (!this.user.avatar) {
          this.user.avatar = 'https://openstore.obabyball.com/ui_v1/icon/defult-avater.svg',
            this.user.avatar_key = 'efult-avater.svg'
        }
      } catch (e) {

      }
    }
  }),
})
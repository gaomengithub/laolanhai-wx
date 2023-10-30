import { observable, action } from "mobx-miniprogram"
import { getUserInfo, getMyJoinMatches, getMatchApprovals, updateUserInfo } from '$/api'
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
    // 自有字段
    date: ''  //vant 组件要求传入时间戳 birthDate为字符串
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

  // 用于提交后端修改
  modifyUserInfo: action(async function () {
    try {
      const patch = {
        avatar: this.user.avatarKey
      }
      const form = { ...this.user, ...patch }
      await updateUserInfo(form)
    } catch (e) {

    }
  }),

  updateUserInfo: action(async function (form) {
    if (form) {
      if (form.avatarUrl) {
        // 修改头像
        const data = await uploadImgWithToken(form.avatarUrl)
        console.log(data)
        this.user.avatarKey = data.key
        this.user = Object.assign({}, this.user, { avatar: form.avatarUrl })
      }
      else {
        this.user = { ...this.user, ...form }
      }
    }
    else {
      try {
        const data = await getUserInfo()
        const date = new Date(data.birthDate)
        const patch = {
          date: date.getTime()
        }
        this.user = { ...data, ...patch }
      } catch (e) {

      }
    }
  }),
})
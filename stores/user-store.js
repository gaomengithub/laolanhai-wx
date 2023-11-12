import { observable, action } from "mobx-miniprogram"
import { getUserInfo, getMyJoinMatches, getMatchApprovals, updateUserInfo, getStarData, updateStarData } from '$/utils/api'
import { uploadImgWithToken } from '$/utils/qiniu/qiniu'
import { handleErr, handleInfo } from '../modules/msgHandler'
export const user = observable({
  starDetails: {},
  starForm: {
    files: [],
    age: 0,
    assist: 0,
    block: 0,
    height: 0,
    image: '',
    position: '',
    score: 0,
    steal: 0,
    threePoint: 0,
    userId: ''
  },
  approvals: [],
  joinedMatches: [], // 用户参加的比赛
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

  // 预留  用来判断是否能组织正赛
  get isOrg() {
    const quals = this.user.quals.map(item => item.qual)
    return quals.includes(1)
  },

  get isUser() {
    try {
      // 可能是因为微信小程序内存回收机制的问题，user 可能是被清理
      // const quals = wx.getStorageSync('quals').map(item => item.qual)
      const quals = this.user.quals.map(item => item.qual)
      return !quals.includes(2)
    } catch (e) {
      return false
    }
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

  updateStarDetails: action(async function (params) {
    try {
      const data = await getStarData(params)
      this.starDetails = data
    } catch (e) {

    }
  }),
  activeStar: action(async function name(params) {
    try {
      const patch = {
        image: this.starForm.files[0].key,
        userId: this.id
      }
      const data = { ...this.starForm, ...patch }
      await updateStarData(data)
      handleInfo("成功", wx.navigateBack)
    } catch {
      handleErr("失败")
    }
  }),

  updateStarForm: action(async function (params) {
    // 更新图片
    if (params.tempFilePath) {
      var _this = this
      wx.compressImage({
        src: params.tempFilePath,
        quality: 10,
        success: async function (res) {
          const data = await uploadImgWithToken(res.tempFilePath)
          const item = { url: params.tempFilePath, isImage: true }
          _this.starForm.files.push({ ...data, ...item })
          // 部分更新
          _this.starForm = Object.assign({}, _this.starForm, { files: _this.starForm.files })
        }
      })
    }
    // 删除图片
    else if (typeof params === 'number') {
      this.starForm.files.splice(params, 1)
      this.starForm = Object.assign({}, this.starForm, { files: this.starForm.files })
    }
    // 修改比赛，需要先获得比赛信息，修改form
    else if (typeof params === 'string') {
      try {
        const data = await getStarData(params)
        const patch = {
          files: [{ url: data.image, isImage: true, key: data.imageKey }]
        }
        this.starForm = { ...this.starForm, ...data, ...patch }
      } catch (e) {
        handleErr("获取数据失败")
      }
    }
    // 更新其他字段
    else {
      this.starForm = { ...this.starForm, ...params }
    }
  }),

  updateApprovals: action(async function () {
    // const data = await getMatchApprovals()

  }),
  updateUserMatches: action(async function () {
    const data = await getMyJoinMatches()
    this.joinedMatches = data.matches
  }),

  // 用于提交后端修改
  modifyUserInfo: action(async function () {
    try {
      const patch = {
        avatar: this.user.avatarKey,
        height: '170'
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
    // 获取用户信息更新user
    else {
      try {
        const data = await getUserInfo()
        const date = new Date(data.birthDate)
        const patch = { date: date.getTime() }
        this.user = { ...data, ...patch }
      } catch (e) {
        handleErr("获得用户信息失败")
      }
    }
  }),
})
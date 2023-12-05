import { observable, action } from "mobx-miniprogram"
import { getUserInfo, getMyJoinMatches, getMatchApprovals, updateUserInfo, getStarData, updateStarData, getTeamsList, getMyJoinTeamsList } from '$/utils/api'
import { uploadImgWithToken } from '$/utils/qiniu/qiniu'
import { handleErr, handleInfo } from '../modules/msgHandler'
import { userFormRules, userFormMessages, userFormRules_, userFormMessages_ } from '$/utils/validate/validate-set'
import WxValidate from '$/utils/validate/WxValidate'
export const user = observable({
  validate: new WxValidate(userFormRules, userFormMessages),
  validate_: new WxValidate(userFormRules_, userFormMessages_),
  showStarPage: true,
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
  userInfo: {

  },
  userForm: {

  },
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

  get isUserFormRequired() {
    if (this.isUser) {
      console.log(this.user.nickName)
      return this.user.nickName
      if (!this.user.avatarKey && !this.user.nickName) {
        console.log(this.user.nickName)
        return this.user.nickName
      } else {
        return true
      }
    }
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
      const quals = wx.getStorageSync('quals')
      if (quals) {
        const arr = quals.map(item => item.qual)
        return !arr.includes(2)
      } else {
        throw new Error("权限读取错误")
      }
    }
  },

  get isTeamLeader() {
    try {
      const quals = this.user.quals.map(item => item.qual)
      return quals.includes(4)
    } catch (e) {
      const quals = wx.getStorageSync('quals')
      if (quals) {
        const arr = quals.map(item => item.qual)
        return arr.includes(4)
      } else {
        throw new Error("权限读取错误")
      }
    }
  },


  get tags() {
    const quals = wx.getStorageSync('quals')
    if (quals) {
      const arr = quals.map(item => item.qual)
      const tags = {
        isTeamLeader: arr.includes(4)
      }
      return tags
    }
    else {
      return {
        isTeamLeader: false
      }
    }
  },


  initStarForm: action(function () {
    let backup = JSON.parse(JSON.stringify(starFormBackup));
    this.starForm = JSON.parse(JSON.stringify(backup));
  }),

  updateStarDetails: action(async function (id, share) {
    if (share) {
      const data = await getStarData(id)
      const part = await getUserInfo(id)
      const arr = part.quals.map(item => item.qual)
      const patch = {
        isTeamLeader: arr.includes(4)
      }
      this.starDetails = { ...data, ...patch, ...part }
    }
    else {
      if (!this.isUser) {
        handleInfo("您还没有完成注册，请先完成注册再查看。",
          function () {
            wx.navigateTo({ url: '/pages/sub/user-form/index?page=create' })
          }
        )
        return
      }
      try {
        const data = await getStarData(id)
        if (!data.imageKey) {
          throw new Error("球星卡信息不完整")
        }
        const part = await getUserInfo(id)
        const arr = part.quals.map(item => item.qual)
        const patch = {
          isTeamLeader: arr.includes(4)
        }
        this.starDetails = { ...data, ...patch, ...part }
      } catch (e) {
        handleInfo("球星卡信息不完整，请填写信息",
          function () {
            wx.navigateTo({ url: '/pages/sub/star-data-form/index?id=' + id })
          }
        )
      }
    }





  }),


  activeStar: action(async function () {
    try {
      const patch = {
        image: this.starForm.files[0].key,
        userId: this.id
      }
      const data = { ...this.starForm, ...patch }
      await updateStarData(data)
      await this.updateStarDetails(this.id)
      handleInfo("录入成功", wx.navigateBack)
    } catch {
      handleErr("输入的数据可能存在异常")
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
        // 如果是新建 那么上面的内容必要报错
        // handleErr("获取数据失败")
        this.initStarForm()
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

  // 用于提交后端修改  其实应该是active
  modifyUserInfo: action(async function () {
    let form = null
    let isVali = false
    let error = null
    if (!this.isUser) {
      form = {
        id: this.id,
        avatar: this.user.avatarKey,
        birthDate: this.user.birthDate,
        nickName: this.user.nickName
      }
    } else {
      const patch = {
        avatar: this.user.avatarKey,
        height: this.user.height.replace("cm", "")
      }
      form = { ...this.user, ...patch }
    }
    if (!this.isUser) {
      isVali = this.validate_.checkForm(form)
      error = this.validate_.errorList[0];
    } else {
      isVali = this.validate.checkForm(form)
      error = this.validate.errorList[0];
    }
    if (!isVali) {
      handleErr(error.msg)
    } else {
      try {
        await updateUserInfo(form)
        await this.updateUserInfo()
        handleInfo("更新成功", wx.navigateBack)
      } catch (e) {
        handleErr("更新出错")
      }
    }
  }),

  initUserInfo: action(function () {
    let backup = JSON.parse(JSON.stringify(userBackup));
    this.user = JSON.parse(JSON.stringify(backup));
  }),

  updateUserInfo: action(async function (form) {
    if (form) {
      if (form.avatarUrl) {
        // 修改头像
        const data = await uploadImgWithToken(form.avatarUrl)
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
        this.initUserInfo()
        const data = await getUserInfo()
        const data_ = await getTeamsList()
        const data__ = await getMyJoinMatches()
        const myMatches = data__.matches
        const myTeams = data_.items.filter(item => item.isMyTeam)
        if (data.birthDate) {
          this.user.date = new Date(data.birthDate).getTime()
        }
        this.user = { ...this.user, ...data, myTeams, myMatches }
      } catch (e) {
        handleErr("获得用户信息失败")
      }
    }
  }),
})

let starFormBackup = {
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
}


let userBackup = {
  about: '',
  avatar: '',
  birthDate: '',
  height: '172',
  honors: '',
  id: '',
  nickName: '',
  weight: '68',
  avatarKey: '',
  // 自有字段
  date: "-652963200000"  //vant 组件要求传入时间戳 birthDate为字符串
}
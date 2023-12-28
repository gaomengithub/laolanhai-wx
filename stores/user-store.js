import { observable, action } from "mobx-miniprogram"
import { getUserBaseInfo, getMyJoinMatches, getMatchApprovals, updateUserInfo, getStarData, updateStarData, getTeamsList, getMyJoinTeamsList, getCustomMatchRecord } from '$/utils/api'
import { uploadImgWithToken } from '$/utils/qiniu/qiniu'
import { handleErr, handleInfo, handleErrWithLog } from '../modules/msgHandler'
import { userFormRules, userFormMessages, userFormRules_, userFormMessages_ } from '$/utils/validate/validate-set'
import WxValidate from '$/utils/validate/WxValidate'
export const user = observable({
  validate: new WxValidate(userFormRules, userFormMessages),
  validate_: new WxValidate(userFormRules_, userFormMessages_),
  showStarPage: true,
  starDetails: {},
  playerData: {
    sum: {
      assist: "",
      block: "",
      hit_free_throw: "",
      hit_three_point: "",
      hit_two_point: "",
      is_win: "",
      rebound: "",
      steal: "",
      total_free_throw: "",
      total_point: "",
      total_three_point: "",
      total_two_point: ""
    },
    per: {
      free_throw: "",
      point: "",
      point: "",
    },
    avg: {
      assist: "",
      block: "",
      hit_free_throw: "",
      hit_three_point: "",
      hit_two_point: "",
      is_win: "",
      rebound: "",
      steal: "",
      total_free_throw: "",
      total_point: "",
      total_three_point: "",
      total_two_point: ""
    }
  },
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
  userForm: null,
  userInfo: {
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
    let id = ""
    try {
      id = this.userInfo.id
    } catch (e) {
      id = wx.getStorageSync('id')
    }
    return id
  },

  // 预留  用来判断是否能组织正赛
  get isOrg() {
    try {
      const quals = this.userInfo.quals.map(item => item.qual)
      return quals.includes(1)
    } catch (e) {
      const quals = wx.getStorageSync('quals')
      return quals.includes(1)
    }
  },

  get isEditor() {
    if (this.starDetails.userId == this.id) {
      return true
    }
    try {
      const quals = this.userInfo.quals.map(item => item.qual)
      return quals.includes(8)
    } catch (e) {
      const quals = wx.getStorageSync('quals')
      return quals.includes(8)
    }
  },

  get isUser() {
    try {
      const quals = this.userInfo.quals.map(item => item.qual)
      return !quals.includes(2)
      // 如果user中没有取到 则去本地存储中取
    } catch (e) {
      const quals = wx.getStorageSync('quals')
      if (quals) {
        const arr = quals.map(item => item.qual)
        return !arr.includes(2)
      } else {
        return false
      }
      // 添加上报
    }
  },

  get isTeamLeader() {
    try {
      const quals = this.userInfo.quals.map(item => item.qual)
      return quals.includes(4)
    } catch (e) {
      const quals = wx.getStorageSync('quals')
      if (quals) {
        const arr = quals.map(item => item.qual)
        return arr.includes(4)
      } else {
        return false
        // throw new Error("权限读取错误")
      }
      // 添加上报
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
    } else {
      return {
        isTeamLeader: false
      }
    }
  },

  updatePlayerData: action(async function (params) {
    try {
      const data = await getCustomMatchRecord()
      if (data) {
        const assist_arr = data.map(item => item.assist)
        const block_arr = data.map(item => item.block)
        const hit_free_throw_arr = data.map(item => item.hit_free_throw)
        const hit_three_point_arr = data.map(item => item.hit_three_point)
        const hit_two_point_arr = data.map(item => item.hit_two_point)
        const is_win_arr = data.map(item => item.is_win)
        const rebound_arr = data.map(item => item.rebound)
        const steal_arr = data.map(item => item.steal)
        const total_free_throw_arr = data.map(item => item.total_free_throw)
        const total_three_point_arr = data.map(item => item.total_three_point)
        const total_two_point_arr = data.map(item => item.total_two_point)
        const total_point_arr = [
          ...hit_free_throw_arr.map(item => item * 1),
          ...hit_three_point_arr.map(item => item * 3),
          ...hit_two_point_arr.map(item => item * 2)
        ]
        this.playerData = {
          sum: {
            assist: assist_arr.reduce((prev, curr) => { return prev + curr }),
            block: block_arr.reduce((prev, curr) => { return prev + curr }),
            hit_free_throw: hit_free_throw_arr.reduce((prev, curr) => { return prev + curr }),
            hit_three_point: hit_three_point_arr.reduce((prev, curr) => { return prev + curr }),
            hit_two_point: hit_two_point_arr.reduce((prev, curr) => { return prev + curr }),
            is_win: is_win_arr.filter(item => item).length,
            is_loss: is_win_arr.filter(item => !item).length,
            rebound: rebound_arr.reduce((prev, curr) => { return prev + curr }),
            steal: steal_arr.reduce((prev, curr) => { return prev + curr }),
            total_free_throw: total_free_throw_arr.reduce((prev, curr) => { return prev + curr }),
            total_point: total_point_arr.reduce((prev, curr) => { return prev + curr }),
            total_three_point: total_three_point_arr.reduce((prev, curr) => { return prev + curr }),
            total_two_point: total_two_point_arr.reduce((prev, curr) => { return prev + curr }),
          },
          per: {
            free_throw: (
              hit_free_throw_arr.reduce((prev, curr) => { return prev + curr }) /
              total_free_throw_arr.reduce((prev, curr) => { return prev + curr }) * 100
            ).toFixed(1),
            two_point: (
              hit_two_point_arr.reduce((prev, curr) => { return prev + curr }) /
              total_two_point_arr.reduce((prev, curr) => { return prev + curr }) * 100
            ).toFixed(1),
            three_point: (
              hit_three_point_arr.reduce((prev, curr) => { return prev + curr }) /
              total_three_point_arr.reduce((prev, curr) => { return prev + curr }) * 100
            ).toFixed(1),
          },
          avg: {
            assist: (
              assist_arr.reduce((prev, curr) => { return prev + curr }) / assist_arr.length
            ).toFixed(1),
            block: (
              block_arr.reduce((prev, curr) => { return prev + curr }) / block_arr.length
            ).toFixed(1),
            hit_free_throw: (
              hit_free_throw_arr.reduce((prev, curr) => { return prev + curr }) / hit_free_throw_arr.length
            ).toFixed(1),
            hit_three_point: (
              hit_three_point_arr.reduce((prev, curr) => { return prev + curr }) / hit_three_point_arr.length
            ).toFixed(1),
            hit_two_point: (
              hit_two_point_arr.reduce((prev, curr) => { return prev + curr }) / hit_two_point_arr.length
            ).toFixed(1),
            // is_win: (
            //   assist_arr.reduce((prev, curr) => { return prev + curr }) / assist_arr.length
            // ).toFixed(1),
            rebound: (
              rebound_arr.reduce((prev, curr) => { return prev + curr }) / rebound_arr.length
            ).toFixed(1),
            steal: (
              steal_arr.reduce((prev, curr) => { return prev + curr }) / steal_arr.length
            ).toFixed(1),
            total_free_throw: (
              total_free_throw_arr.reduce((prev, curr) => { return prev + curr }) / total_free_throw_arr.length
            ).toFixed(1),
            total_point: (
              total_point_arr.reduce((prev, curr) => { return prev + curr }) / total_point_arr.length
            ).toFixed(1),
            total_three_point: (
              total_three_point_arr.reduce((prev, curr) => { return prev + curr }) / total_three_point_arr.length
            ).toFixed(1),
            total_two_point: (
              total_two_point_arr.reduce((prev, curr) => { return prev + curr }) / total_two_point_arr.length
            ).toFixed(1),
          }
        }
      }
    } catch (e) {
      handleErr("您还没有录入比赛数据，不能查看该页面", wx.navigateBack)
    }

  }),

  initStarForm: action(function () {
    let backup = JSON.parse(JSON.stringify(starFormBackup));
    this.starForm = JSON.parse(JSON.stringify(backup));
  }),

  updateStarDetails: action(async function (id, share) {
    // 如果是分享的情况则不检查是否注册成为用户
    if (share) {
      const data = await getStarData(id)
      const part = await getUserBaseInfo(id)
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
          throw new Error("球星卡必要信息不完整，请填写信息")
        }
        const part = await getUserBaseInfo(id)
        const arr = part.quals.map(item => item.qual)
        const patch = {
          isTeamLeader: arr.includes(4)
        }
        this.starDetails = { ...data, ...patch, ...part }
      } catch (e) {
        handleInfo("球星卡必要信息不完整，请填写信息",
          function () {
            wx.navigateTo({ url: '/pages/sub/star-data-form/index?id=' + id })
          }
        )
      }
    }
  }),


  activeStar: action(async function (id) {
    try {
      const patch = {
        image: this.starForm.files[0].key,
        userId: id
      }
      const data = { ...this.starForm, ...patch }
      await updateStarData(data)
      await this.updateStarDetails(id)
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
    // 修改
    else if (typeof params === 'string') {
      this.initStarForm()
      try {
        const data = await getStarData(params)
        let patch = {}
        if (data.image) {
          patch = {
            files: [{ url: data.image, isImage: true, key: data.imageKey }]
          }
        }
        this.starForm = { ...this.starForm, ...data, ...patch }
      } catch (e) {
        // 如果是新建 那么上面的内容必要报错
        // handleErr("获取数据失败")
        // this.initStarForm()
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
    if (data.matches) {
      this.joinedMatches = data.matches
    }
  }),

  activeUser: action(async function () {
    let form = null
    let isVali = false
    let error = null
    // 判断是否是游客，游客是初始注册，注册只需要头像、生日和昵称
    if (!this.isUser) {
      form = {
        id: this.id,
        avatar: this.userForm.avatarKey,
        birthDate: this.userForm.birthDate,
        nickName: this.userForm.nickName
      }
    } else {
      // 如果是用户，则字段多身高、体重、自我介绍，传递整个userForm
      // 需要对userForm部分字段做修正
      const patch = {
        avatar: this.userForm.avatarKey,
        height: this.userForm.height.replace("cm", "")
      }
      form = { ...this.userForm, ...patch }
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

  initUserForm: action(function () {
    let backup = JSON.parse(JSON.stringify(userFormBackup));
    this.userForm = JSON.parse(JSON.stringify(backup));
  }),

  updateUserInfo: action(async function () {
    try {
      const data = await getUserBaseInfo()
      const teams = await getTeamsList()
      const matches = await getMyJoinMatches()
      let myMatches = matches?.matches?.length ? matches.matches : []
      let myTeams = teams?.items?.length ? teams.items.filter(item => item.isMyTeam) : []
      const patch = { myMatches, myTeams }
      this.userInfo = { ...this.userInfo, ...data, ...patch }
    } catch (e) {
      console.log(e)
      handleErr("获得用户信息失败")
    }
  }),

  updateUserForm: action(async function (form) {
    if (form) {
      if (form.avatarUrl) {
        // 修改头像
        const data = await uploadImgWithToken(form.avatarUrl)
        this.userForm.avatarKey = data.key
        this.userForm = Object.assign({}, this.userForm, { avatar: form.avatarUrl })
      }
      else {
        // 修改其他字段
        this.userForm = { ...this.userForm, ...form }
      }
    }
    // 给userForm赋值
    else {
      try {
        this.initUserForm()
        const data = await getUserBaseInfo()
        if (data.birthDate) {
          this.userForm.date = new Date(data.birthDate).getTime()
        }
        this.userForm = { ...this.userForm, ...data }
      } catch (e) {
        console.log(e)
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


let userFormBackup = {
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
  //vant 组件要求传入时间戳 birthDate为字符串
  date: "-652963200000"
}
import { observable, action } from "mobx-miniprogram"
import { getMatches, joinMatch, getMatchDesc, createMatch, updateMatch, updateMatchStatus, updateMatchPhoto, getArenaList, getMyJoinMatches, getTeamsList, updateCustomMatchRecord, getCustomMatchRecord, getMatchInputRecord } from '$/utils/api'
import { compressUploadImg } from '$/utils/qiniu/qiniu'
import { matchFormMessages, matchFormRules, customInputFormRules, customInputFormMessages } from '$/utils/validate/validate-set'
import WxValidate from '$/utils/validate/WxValidate'
import { handleErr, handleInfo } from '../modules/msgHandler'
import { formatDate, formatTime } from '$/utils/util'

let oldMatchesList = []

export const match = observable({
  validate: new WxValidate(matchFormRules, matchFormMessages),  // 创建比赛表单验证
  customInputValidate: new WxValidate(customInputFormRules, customInputFormMessages),
  matchForm: null,
  overMatchesList: null,
  matchResult: null, // 赛况中 完成了的比赛
  matchDetails: {},  //比赛详情
  matchesList: [],
  joinedMatches: null,

  matchInputData: {
    mvp: {

    },
    rows: []
  },
  customInputForm: {
    assist: "",
    block: "",
    hit_free_throw: "",
    hit_three_point: "",
    hit_two_point: "",
    is_win: false,
    match_id: "",
    rebound: "",
    steal: "",
    total_free_throw: "",
    total_three_point: "",
    total_two_point: "",
    total_point: 0,
  },
  // 筛选条件
  options: {
    city: '',
    status: [0, 1, 2, 3],
    match_type: [],
    page_size: 10,
    page_token: '',
    team_id: '',
    user_id: '',
    date: '全部时间', //后端还未添加该筛选条件
    currentDate: null
  },


  updateMatchInputData: action(async function (id) {
    try {
      const data = await getMatchInputRecord(id)
      this.matchInputData = { rows: data }
    } catch (e) {

    }
  }),


  activeCustomMatchRecord: action(async function () {

    const diff = Math.min(
      this.customInputForm.total_free_throw - this.customInputForm.hit_free_throw,
      this.customInputForm.total_two_point - this.customInputForm.hit_two_point,
      this.customInputForm.total_three_point - this.customInputForm.hit_three_point,
    )
    console.log(this.customInputForm.total_two_throw - this.customInputForm.hit_two_throw)
    this.customInputForm = { ...this.customInputForm, diff }
    if (!this.customInputValidate.checkForm(this.customInputForm)) {
      const error = this.customInputValidate.errorList[0]
      handleErr(error.msg)
      return
    }
    try {
      await updateCustomMatchRecord(this.customInputForm)
    } catch (e) {
      if (e.statusCode == 400) {
        handleErr(e.data.message)
      }
    }
  }),

  updateCustomInputForm: action(async function (patch) {
    if (patch) {

      this.customInputForm = { ...this.customInputForm, ...patch }
      const total_point = (this.customInputForm.hit_free_throw || 0) * 1 + (this.customInputForm.hit_two_point || 0) * 2 + (this.customInputForm.hit_three_point || 0) * 3
      this.customInputForm = { ...this.customInputForm, total_point }
    } else {
      try {
        const data = await getCustomMatchRecord()
        const arr = data.filter(item => item.match_id == this.customInputForm.match_id)
        if (arr.length > 0) {
          this.customInputForm = arr[0]
        }

      } catch (e) {

      }
    }
  }),



  updateJoinedMatches: action(async function (params) {
    try {
      const data = await getMyJoinMatches()
      this.joinedMatches = data.list
    } catch (e) {
      handleErr("获取我参加的比赛失败")
    }
  }),

  updateMatchResult: action(async function (params) {
    // 上传照片
    if (params.tempFilePath) {
      try {
        const key = await compressUploadImg(params.tempFilePath)

        this.matchResult.photo_for_user.push({ url: params.tempFilePath, isImage: true, photo_key: key })
        this.matchResult = Object.assign({}, this.matchResult, { photo_for_user: this.matchResult.photo_for_user })
        const payload = {
          match_id: this.matchResult.id,
          photo: this.matchResult.photo_for_user.map(item => item.photo_key)
        }
        await updateMatchPhoto(payload)
        handleInfo("上传成功")
      } catch (e) {
        if (e.statusCode == 400) {
          handleErr(e.data.message)
        } else {
          handleErr("上传照片出错")
        }
      }
    }
    // 传参id 
    else if (typeof params === "string") {
      const data = await getMatchDesc(params)
      // data.photo_for_user.map(item => (item.url = item.photo))
      // data.photo_for_user.map(item => (item.isImage = true))
      // 临时的
      const patch = {
        photo_for_user: [...data.attachments, data.banner_attachments].map(item => ({ url: item, isImage: true }))
        // myPhotos: data.photo_for_user.filter(item => item.is_my_upload),
        // otherPhotos: data.photo_for_user.filter(item => !item.is_my_upload),
        // allPhotos: [...data.attachments, data.banner_attachments, ...data.photo_for_user.map(item => item.photo)]
      }
      this.matchResult = { ...data, ...patch }
    }
    // 删除
    else if (typeof (params) === "number") {
      try {
        this.matchResult.myPhotos.splice(params, 1)
        this.matchResult = Object.assign({}, this.matchResult, { myPhotos: this.matchResult.myPhotos })
        const obj = {
          match_id: this.matchResult.id,
          photo: this.matchResult.myPhotos.map(item => item.photo_key)
        }
        await updateMatchPhoto(obj)
        handleInfo("删除成功")
      } catch (e) {
        handleErr("删除失败")
      }
    }
  }),

  initMatchForm: action(async function (params) {
    let backup = JSON.parse(JSON.stringify(matchFormBackup));
    this.matchForm = JSON.parse(JSON.stringify(backup));
    try {
      const data = await getArenaList({
        isMySportsHall: true
      })
      const data_ = await getTeamsList()
      let myArenas = []
      let myTeams = []
      if (data.list) {
        myArenas = data.list
      }
      if (data_.items) {
        myTeams = data_.items.filter(team => team.isMyTeam)
      }

      const patch = {
        myArenas,
        myTeams
      }
      // const patch = {
      //   myArenas: data.list,
      //   myTeams: data_.items.filter(team => team.isMyTeam)
      // }

      this.matchForm = { ...this.matchForm, ...patch }
    } catch (e) {
      handleErr("获取相关信息失败")
    }
  }),

  updateMatchDetails: action(async function (id) {
    if (id) {
      try {
        const data = await getMatchDesc(id)
        const patch = {
          photos: [data.banner_attachments, ...data.attachments]
        }
        this.matchDetails = { ...data, ...patch }
      } catch (e) {
        handleErr("获取比赛详情失败")
      }

    } else {
      handleErr("非法的比赛ID")
    }
  }),

  activeMatch: action(async function () {
    const patch = {
      age_diff: this.matchForm.age_group_end - this.matchForm.age_group_start,
      time_diff: getDiffInMinute(this.matchForm.end_time, this.matchForm.start_time),
      files_count: this.matchForm.files.length,
      start_time: `${this.matchForm.date}T${this.matchForm.start_time}:00+08:00`,
      end_time: `${this.matchForm.date}T${this.matchForm.end_time}:00+08:00`,
      city: this.matchForm.region.split("/")[1],
      location: `${this.matchForm.region}||${this.matchForm.address}`,
      banner_attachments: this.matchForm.files.map(item => item.key)[0],
      attachments: this.matchForm.files.slice(1).map(item => item.key),
      price: { "免费": "0", "约10元": "10", "约20元": "20", "约30元": "30" }[this.matchForm.cost],
      // 组织者
      organizer: wx.getStorageSync('id'),
      sports_halls: this.matchForm.arena.id,
      team_id: this.matchForm.team.id
    }

    const form = { ...this.matchForm, ...patch }
    if (!this.validate.checkForm(form)) {
      const error = this.validate.errorList[0];
      handleErr(error.msg)
      return
    }

    // 特殊判定：
    if (this.matchForm.match_type == 2 && !this.matchForm.team.id) {
      handleErr("你选择创建的是战队赛，请选择关联球队")
      return
    }

    // 如果表单校验合格后
    else {
      if (!this.matchForm.id) {
        //新建
        try {
          await createMatch(form)
          handleInfo("创建成功", wx.navigateBack)
          // 刷新比赛列表
          this.updateMatchesList(true)
        } catch (e) {
          handleErr("创建比赛失败")
        }
      }
      // 修改
      else {
        try {
          await updateMatch(form)
          // 即时刷新
          this.updateMatchDetails(this.matchForm.id)
          handleInfo("修改成功", wx.navigateBack)
        } catch (e) {
          handleErr("修改比赛失败")
        }
      }
    }
  }),

  updateMatchStatus: action(async function (id, code) {
    const data = {
      match_id: id,
      status: code
    }
    try {
      await updateMatchStatus(data)
    } catch (e) {
      if (e.statusCode == 400) {
        // handleErr("更新失败，需要按步骤更新比赛")
      } else {
        handleErr("更新失败，未知错误")
      }
    }
  }),

  updateMatchForm: action(async function (params) {
    // 更新图片
    if (params.tempFilePath) {
      try {
        const key = await compressUploadImg(params.tempFilePath)
        const item = { url: params.tempFilePath, isImage: true }
        this.matchForm.files.push({ key, ...item })
        // 部分更新
        this.matchForm = Object.assign({}, this.matchForm, { files: this.matchForm.files })
      } catch (e) {
        handleErr("上传图片失败")
      }
    }
    // 删除图片
    else if (typeof params === 'number') {
      this.matchForm.files.splice(params, 1)
      this.matchForm = Object.assign({}, this.matchForm, { files: this.matchForm.files })
    }
    // 修改比赛，需要先获得比赛信息，修改form
    else if (typeof params === 'string') {
      try {
        await this.initMatchForm()

        const data = await getMatchDesc(params)

        const date = formatDate(new Date(data.start_time))
        const start_time = formatTime(new Date(data.start_time))
        const end_time = formatTime(new Date(data.end_time))
        const [region, address] = data.location.split("||");
        const cost = ["免费", "约10元", "约20元", "约30元"][data.price[0]]

        const sports_halls = data.sports_halls.id

        const arena = this.matchForm.myArenas.filter(item => item.id == sports_halls)[0]

        if (data.match_type == 2) {
          this.matchForm.team = this.matchForm.myTeams.filter(item => item.id == data.owner_team)[0]
        }

        const files = [
          { url: data.banner_attachments, isImage: true, key: data.banner_attachments_key },
          { url: data.attachments[0], isImage: true, key: data.attachments_key[0] }
        ]
        const patch = {
          date, start_time, end_time, region, address, cost, files, sports_halls, arena
        }

        this.matchForm = { ...this.matchForm, ...data, ...patch }
      } catch (e) {
        console.log(e)
        handleErr("修改比赛，获得比赛信息失败")
      }
    }
    // 更新其他字段
    else {
      this.matchForm = { ...this.matchForm, ...params }
    }
  }),


  updateOverMatchesList: action(async function (patch) {
    try {
      const options = { ...this.options, ...patch }
      const data = await getMatches(options)
      this.overMatchesList = data.matches
    } catch (e) {
      handleErr("获取赛事错误")
    }
  }),



  modifyOptions: action(function (filter) {
    this.options = { ...this.options, ...filter }
    this.updateMatchesList(true)
  }),

  // 每当this.options发生变化
  /**
   * @param {boolean} force 强制刷新
   */
  updateMatchesList: action(async function (force) {

    if (force) {
      this.matchesList = []
      this.options.page_token = ""
    }
    try {
      const data = await getMatches(this.options)
      // console.log(data.matches)
      // console.log(oldMatchesList)
      // if (data.matches == this.oldMatchesList) {
      //   return
      // }
      if (data.matches) {
        this.matchesList = [...this.matchesList, ...data.matches]
        this.options.page_token = data.next_page_token
        // oldMatchesList = data.matches
      }
    } catch (e) {
      handleErr("获取比赛列表中出现错误。")
    }
  }),
  /**
   * @param {string} id  比赛的id
   */
  joinMatch: action(async function (match_id, team_id) {

    try {
      let data = {
        match_id: match_id
      }
      if (team_id) {
        data.team_id = team_id
      }
      await joinMatch(data)
      // 强制刷新比赛详情 列表
      await this.updateMatchDetails(match_id)
      await this.updateMatchesList(true)
      handleInfo("报名成功")
    } catch (e) {
      if (e.statusCode == 400) {
        if (e.data.message == "已报名") handleErr("您已报名，请勿反复报名")
        if (e.data.message == "队长") handleErr("此比赛为战队赛，需要队长报名")
      }
    }
  })
});


function getDiffInMinute(end, start) {
  const t1 = end.split(":");
  const t2 = start.split(":");
  const minute1 = parseInt(t1[0]) * 60 + parseInt(t1[1]);
  const minute2 = parseInt(t2[0]) * 60 + parseInt(t2[1]);
  return minute1 - minute2;
}

let matchFormBackup = {
  //自有字段
  date: '',
  region: '',
  address: '',
  files: [],
  cost: '免费',
  myArenas: [],
  arena: {
    name: "",
    id: ""
  },
  myTeams: [],
  team: {
    name: "",
    id: ""
  },
  //后端字段
  sports_halls: '',
  age_group_end: '',
  age_group_start: '',
  attachments: [],
  attachments_key: [],
  banner_attachments: '',
  banner_attachments_key: '',
  city: '',
  description: '',
  end_time: '10:00',
  id: null,
  join_num: '',
  location: '',
  match_type: '',
  name: '',
  organizer: '',
  price: '',
  start_time: '08:00',
}
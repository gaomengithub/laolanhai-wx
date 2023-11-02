import { observable, action } from "mobx-miniprogram"
import { getMatches, joinMatch, getMatchDesc, createMatch, updateMatch, updateMatchStatus, updateMatchPhoto, getArenaList ,getMyJoinMatches } from '$/utils/api'
import { uploadImgWithToken } from '$/utils/qiniu/qiniu'
import { matchFormMessages, matchFormRules } from '$/utils/validate/validate-set'
import WxValidate from '$/utils/validate/WxValidate'
import { handleErr, handleInfo } from '../modules/msgHandler'
import { formatDate, formatTime } from '$/utils/util'
export const match = observable({
  validate: new WxValidate(matchFormRules, matchFormMessages),
  matchForm: null,
  overMatchesList: null,
  matchResult: null, // 赛况中 完成了的比赛
  matchDetails: null,  //比赛详情
  matchesList: null,
  JoinedMatches: null,
  next_page_token: '',  // 比赛列表的
  // 筛选条件
  options: {
    city: '',
    status: [0, 1],
    match_type: [],
    page_size: 10,
    page_token: '',
    team_id: '',
    user_id: '',
    date: '全部时间' //后端还未添加该筛选条件
  },



  // 我组织的比赛
  get getMyMatches() {

  },

  updateJoinedMatches: action(async function (params) {
    try {
      const data = await getMyJoinMatches()
      
      this.JoinedMatches = data.list
    }catch(e){

    }
  }),

  updateMatchResult: action(async function (params) {
    if (params.tempFilePath) {
      var _this = this
      wx.compressImage({
        src: params.tempFilePath,
        quality: 10,
        success: async function (res) {
          const data = await uploadImgWithToken(res.tempFilePath)
          _this.matchResult.myPhotos.push({ url: params.tempFilePath, isImage: true, photo_key: data.key })
          _this.matchResult = Object.assign({}, _this.matchResult, { myPhotos: _this.matchResult.myPhotos })
          const obj = {
            match_id: _this.matchResult.id,
            photo: _this.matchResult.myPhotos.map(item => item.photo_key)
          }
          await updateMatchPhoto(obj)
        }
      })

    }
    // 传参id 
    else if (typeof (params) === "string") {
      const data = await getMatchDesc(params)
      data.photo_for_user.map(item => (item.url = item.photo))
      data.photo_for_user.map(item => (item.isImage = true))
      const patch = {
        myPhotos: data.photo_for_user.filter(item => item.is_my_upload),
        otherPhotos: data.photo_for_user.filter(item => !item.is_my_upload),
        allPhotos: [...data.attachments, data.banner_attachments, ...data.photo_for_user.map(item => item.photo)]
      }
      this.matchResult = { ...data, ...patch }
    }
    // 删除
    else if (typeof (params) === "number") {

    }
  }),

  initMatchForm: action(async function (params) {
    let backup = JSON.parse(JSON.stringify(matchFormBackup));
    this.matchForm = JSON.parse(JSON.stringify(backup));
    const data = await getArenaList({
      isMySportsHall: true
    })
    const patch = {
      myArenas: data.list
    }
    this.matchForm = { ...this.matchForm, ...patch }
  }),

  updateMatchDetails: action(async function (id) {
    if (id) {
      try {
        const data = await getMatchDesc(id)
        this.matchDetails = data
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
      price: { "免费": "0", "约10元": "10", "约20元": "20", "约30元": "30" }[this.matchForm.cost]
    }
    const form = { ...this.matchForm, ...patch }
    if (!this.validate.checkForm(form)) {
      const error = this.validate.errorList[0];
      handleErr(error.msg)
    }
    // 如果表单校验合格后
    else {
      if (!this.matchForm.id) {
        //新建
        try {
          await createMatch(form)
          handleInfo("创建成功", wx.navigateBack)
          this.updateMatchesList()
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
      handleErr("更新失败")
    }
  }),

  updateMatchForm: action(async function (params) {
    // 更新图片
    if (params.tempFilePath) {
      var _this = this
      wx.compressImage({
        src: params.tempFilePath,
        quality: 10,
        success: async function (res) {
          const data = await uploadImgWithToken(res.tempFilePath)
          const item = { url: params.tempFilePath, isImage: true }
          _this.matchForm.files.push({ ...data, ...item })
          // 部分更新
          _this.matchForm = Object.assign({}, _this.matchForm, { files: _this.matchForm.files })
        }
      })
    }
    // 删除图片
    else if (typeof params === 'number') {
      this.matchForm.files.splice(params, 1)
      this.matchForm = Object.assign({}, this.matchForm, { files: this.matchForm.files })
    }
    // 修改比赛，需要先获得比赛信息，修改form
    else if (typeof params === 'string') {
      try {
        const data = await getMatchDesc(params)

        const date = formatDate(new Date(data.start_time))
        const start_time = formatTime(new Date(data.start_time))
        const end_time = formatTime(new Date(data.end_time))
        const [region, address] = data.location.split("||");
        const cost = ["免费", "约10元", "约20元", "约30元"][data.price[0]]
        const sports_halls = data.sports_halls.id
        const files = [
          { url: data.banner_attachments, isImage: true, key: data.banner_attachments_key },
          { url: data.attachments[0], isImage: true, key: data.attachments_key[0] }
        ]
        const patch = {
          date, start_time, end_time, region, address, cost, files, sports_halls
        }

        this.matchForm = { ...this.matchForm, ...data, ...patch }
      } catch (e) {
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
    this.updateMatchesList()
  }),

  updateMatchesList: action(async function () {
    try {
      const data = await getMatches(this.options)
      if (data.matches) {
        this.matchesList = data.matches
        this.next_page_token = data.next_page_token
      } else {
        this.matchesList = null
      }
    } catch (e) {
      handleErr("获取比赛列表错误")
    }
  }),
  joinMatch: action(async function (id) {
    try {
      await joinMatch(id)
      this.updateMatchDetails(id)
      handleInfo("报名成功")
    } catch (e) {
      if (e.statusCode == 400) {
        handleErr("您已报名，请勿反复报名")
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
  myArenas: null,
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
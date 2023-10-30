import { observable, action } from "mobx-miniprogram"
import { getMatches, joinMatch, getMatchDesc, createMatch, updateMatch } from '$/api'
import { uploadImgWithToken } from '$/qiniu/qiniu'
import { matchFormMessages, matchFormRules } from '$/validate-set'
import WxValidate from '$/WxValidate'
import { formatDate, formatTime } from '$/util'

export const match = observable({
  validate: new WxValidate(matchFormRules, matchFormMessages),
  matchForm: {
    //自有字段
    date: '',
    region: '',
    address: '',
    files: [],
    cost: '免费',
    //后端字段
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
  },

  over: {
    name: "我在大桥下打篮球",
    poster: '',
    photos: [
      '',
      ''
    ],
    users: [
      {},
      {}
    ]
  },

  match: null,  //比赛详情
  matches: null,
  next_page_token: '',
  options: {
    city: '',
    match_type: [],
    page_size: 10,
    page_token: '',
    team_id: '',
    user_id: '',
    date: '全部时间' //后端还未添加该筛选条件
  },

  // 用于修改比赛信息
  modifyMatchForm: action(async function (id) {
    const data = await getMatchDesc(id)
    // sports_halls存在问题
    delete data['sports_halls'];

    const start_date = new Date(data.start_time)
    const end_date = new Date(data.end_time)
    const start_time = formatTime(start_date)
    const end_time = formatTime(end_date)
    const date = formatDate(start_date)
    const region = data.location.split("||")[0]
    const address = data.location.split("||")[1]
    const cost = ["免费", "约10元", "约20元", "约30元"][data.price[0]]
    const patch = {
      date,
      start_time,
      end_time,
      region,
      address,
      cost,
      files: [
        { url: data.banner_attachments, isImage: true, key: data.banner_attachments_key },
        { url: data.attachments[0], isImage: true, key: data.attachments_key[0] }]
    }
    this.matchForm = { ...data, ...patch }
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
      wx.showModal({
        title: '错误',
        content: error.msg,
        showCancel: false,
        complete: (res) => {
          if (res.confirm) {

          }
        }
      })
    }
    else {
      if (!this.matchForm.id) {
        //新建
        try {
          await createMatch(form)
        } catch (e) {
          console.log("创建比赛失败")
        }
      }
      else {
        try {
          await updateMatch(form)
        } catch (e) {
          console.log("修改比赛失败")
        }
      }
    }
  }),

  updateMatchForm: action(function (params) {
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
    else if (typeof params === 'number') {
      this.matchForm.files.splice(params, 1)
      this.matchForm = Object.assign({}, this.matchForm, { files: this.matchForm.files })
    }
    else {
      this.matchForm = { ...this.matchForm, ...params }
    }
  }),



  modifyOptions: action(function (filter) {
    this.options = { ...this.options, ...filter }
    this.updateMatches()
  }),

  updateMatch: action(async function (id) {
    try {
      const data = await getMatchDesc(id)
      this.match = data
    } catch (e) {

    }
  }),
  updateMatches: action(async function () {
    try {
      const data = await getMatches(this.options)
      if (data.matches) {
        this.matches = data.matches
        this.next_page_token = data.next_page_token

      } else {
        this.matches = null
      }
    } catch (e) {
      wx.showModal({
        title: '错误',
        content: '获取比赛列表时出现未知错误',
        showCancel: false,
        complete: (res) => {
          if (res.confirm) {

          }
        }
      })
    }
  }),
  joinMatch: action(async function (id) {
    try {
      wx.showLoading({ title: '请等待', mask: true, })
      await joinMatch(id)
      wx.hideLoading()
      wx.showModal({
        title: '报名成功',
        content: '您已成功报名，请准时参加',
        showCancel: false,
        complete: (res) => {
          if (res.confirm) {
            this.updateMatch(id)
          }
        }
      })
    } catch (e) {
      if (e.statusCode == 400) {
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: '您已经报过名，请勿重新报名',
          showCancel: false,
          complete: (res) => {
            if (res.confirm) {

            }
          }
        })
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
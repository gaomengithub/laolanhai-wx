import { observable, action } from "mobx-miniprogram"
import { getMatches, joinMatch, getMatchDesc } from '$/api'

export const match = observable({
  over: {
    name:"我在大桥下打篮球",
    poster:'',
    photos:[
      '',
      ''
    ],
    users:[
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

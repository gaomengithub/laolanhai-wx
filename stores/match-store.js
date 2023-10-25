import { observable, action } from "mobx-miniprogram";
import { getMatches, joinMatch } from '$/api'

export const match = observable({
  matchesForSearch:[],
  matches: [],
  next_page_token: '',
  options: {
    city: '',
    match_type: 0,
    page_size: 0,
    page_token: '',
    team_id: '',
    user_id: '',
    date:'全部时间' //后端还未添加该筛选条件
  },
  modifyOptions: action(function (filter) {
    this.options = { ...this.options, ...filter }
    this.updateMatches()
  }),
  updateMatches: action(async function () {
    try {
      const data = await getMatches(this.options)
      if (data.matches) {
        this.matches = data.matches
        this.next_page_token = data.next_page_token
      } else {
        this.matches = []
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
  joinMatch: action(async function (matchID) {
    try {
      await joinMatch(matchID)
    } catch (e) {

    }

  })
});

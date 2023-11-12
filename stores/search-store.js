import { observable, action } from "mobx-miniprogram";
import { searchAngthing } from '$/utils/api'
import { handleErr } from '../modules/msgHandler'
export const search = observable({
  matchSearchResult: null,
  teamSearchResult: null,
  userSearchResult: null,

  search: action(async function (val) {
    try {
      const data = await searchAngthing(val)
      this.matchSearchResult = data.matches == [] ? null :data.matches
      this.teamSearchResult = data.teams == [] ? null :data.teams
      this.userSearchResult = data.users == [] ? null :data.users

    } catch (e) {
      wx.showModal({
        title: '错误',
        content: '搜索出错',
        showCancel: false,
        complete: (res) => {
          if (res.confirm) {

          }
        }
      })
    }

  })
});

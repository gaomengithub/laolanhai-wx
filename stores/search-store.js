import { observable, action } from "mobx-miniprogram";
import { searchAngthing } from '$/utils/api'
import { handleErr } from '../modules/msgHandler'
export const search = observable({
  matches: [],
  teams: [],
  users: [],

  search: action(async function (val) {
    try {
      const data = await searchAngthing(val)
      this.matches = data.matches,
        this.teams = data.teams,
        this.users = data.users

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

import { observable, action } from "mobx-miniprogram"
import { getUserInfo, getMyJoinMatches, getMatchApprovals } from '$/api'

export const user = observable({

  approvals: [],
  matches: [],
  user: null,

  get id() {
    let id = wx.getStorageSync('id')
    return id
  },

  get tags() {
    const quals = this.user.quals.map(item => item.qual)
    const tags = {
      isTeamLeader: quals.includes(4)
    }
    return tags
  },

  updateApprovals: action(async function () {
    // const data = await getMatchApprovals()

  }),
  updateUserMatches: action(async function () {
    const data = await getMyJoinMatches()
    this.matches = data.matches
  }),
  updateUserInfo: action(async function () {
    try {
      const data = await getUserInfo()
      this.user = data
    } catch (e) {

    }
  })
})
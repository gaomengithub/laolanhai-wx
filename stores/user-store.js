import { observable, action } from "mobx-miniprogram"
import { getUserInfoByID, getMyJoinMatches, getMatchApprovals } from '$/api'

export const user = observable({

  approvals: [],
  matches: [],
  userInfo: {

  },
  updateApprovals: action(async function () {
    // const data = await getMatchApprovals()

  }),
  updateMatches: action(async function () {
    const data = await getMyJoinMatches()
    this.matches = data.matches
  }),
  updateUserInfo: action(async function () {
    try {
      const data = await getUserInfoByID()
      this.userInfo = data
    } catch (e) {

    }
  })
})
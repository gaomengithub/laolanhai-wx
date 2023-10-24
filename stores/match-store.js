import { observable, action } from "mobx-miniprogram";
import { getMatches, joinMatch } from '$/api'

export const match = observable({
  matches: [],
  next_page_toke: '',


  updateMatches: action(async function () {
    const data = await getMatches()
    this.matches = data.matches
    this.next_page_toke = data.next_page_toke
  }),
  joinMatch: action(async function (matchID) {
    try {
      await joinMatch(matchID)
    } catch (e) {

    }

  })
});

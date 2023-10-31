import { observable, action } from "mobx-miniprogram"
import { getTeamsList, getTeamDesc } from '$/api'
export const team = observable({
  teamDetails: {

  },
  teams: [],

  get myTeams() {
    let filteredTeams = this.teams.filter(item => item.isMyTeam)
    return filteredTeams
  },
  get notMyTeams() {
    let filteredTeams = this.teams.filter(item => !item.isMyTeam)
    return filteredTeams
  },

  updateTeamDetails: action(async function (id) {
    if (id) {
      try {
        const data = await getTeamDesc(id)
        this.teamDetails = data
      } catch (e) {

      }
    }
  }),

  updateTeams: action(async function () {
    const data = await getTeamsList()
    this.teams = data.items
  })
})
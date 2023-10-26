import { observable, action } from "mobx-miniprogram"
import { getTeamsList } from '$/api'
export const team = observable({
  teams: [],

  get myTeams() {
    let filteredTeams = this.teams.filter(item => item.isMyTeam)
    return filteredTeams && filteredTeams.length ? filteredTeams : false;
  },
  get notMyTeams() {
    let filteredTeams = this.teams.filter(item => !item.isMyTeam)
    return filteredTeams && filteredTeams.length ? filteredTeams : false;
  },

  updateTeams: action(async function () {
    const data = await getTeamsList()
    this.teams = data.items
  })
})
import { observable, action } from "mobx-miniprogram"
import { getTeamDesc, updatMatchePoints, getMatchDesc, createMatchRound, getAllUsers } from "$/utils/api"
import { getInitial } from "$/utils/util"
export const input = observable({
  usersList: [],
  matchDetails: null,
  matchTeamsList: [

  ],
  redTeamDetails: {
    name: "选择队伍"

  },
  blueTeamDetails: {
    name: "选择队伍"
  },

  updateUsersList: action(async function () {
    try {
      const data = await getAllUsers()
      console.log(data)
    } catch (e) {

    }
  }),

  activeMatchRound: action(async function () {
    let data = {
      match_id: this.matchDetails.id,
      start_time: new Date(),
      team_a_id: this.redTeamDetails.id,
      team_b_id: this.blueTeamDetails.id
    }
    try {
      await createMatchRound(data)
    } catch (e) {
      console.log(e)
    }
  }),

  /**
   * @param {'redTeamDetails' || 'blueTeamDetails'} key
   */
  updateTeamDetails: action(async function (key, id) {
    const teamDetails = await getTeamDesc(id)
    this[key] = { ...this[key], ...teamDetails };
  }),

  /**
   * @param {string} id 比赛id
   */
  updateMatchTeamsList: action(async function (id) {
    // 虚拟数据
    // data.teamMember.map(member => {
    //   return { ...member, isPlaying: false };
    // })
    const data = await getMatchDesc(id)
    const teams = data.teams
    this.matchDetails = data
    this.matchTeamsList = teams.map(item => ({ ...item, text: item.name, value: item.id, icon: "" }))
    // this.matchTeamsList = this.matchTeamsList.map(item => ({ ...item, text: item.name, value: item.name, icon: "" }))
  }),
  /**
   * @param {'redTeamDetails' || 'blueTeamDetails'} key
   * @param { string } id 队员id
   */
  updatePlaying: action(function (key, id) {
    for (let i = 0; i < this[key].teamMember.length; i++) {
      let member = this[key].teamMember[i];
      if (member.id === id) {
        member.isPlaying = !member.isPlaying;
        break
      }
    }
    this[key] = { ...this[key] }
  }),
  /**
   * @param {string} matchId 比赛id
   * @param {string} member_id 选手id
   * @param {string} score 动作类型
   */
  updateMatchPoints: action(async function (match_id, member_id, score, current_score) {
    let data = {
      match_id,
      member_id,
      score,
      current_score
    }
    // if (scoreTypes.includes(type)) {
    //   data.score = type
    //   data.current_score = curr
    // } else {
    //   // 犯规的情况
    // }
    try {
      await updatMatchePoints(data)
    } catch (e) {
      console.log(JSON.stringify(e))
    }
  })
})

import { observable, action } from "mobx-miniprogram"
import { getTeamDesc, updatMatchePoints } from "$/utils/api"

export const input = observable({
  homeTeamDetails: {
    teamMember: []
  },
  visitingTeamDetails: {
    teamMember: []
  },


  /**
   * @param {string} id 比赛id
   */
  getMatchTeams: action(async function (id) {
    // 非生产代码
    const TestTeam = '2VHGPbfpamIY3INdApCdklaPGY1'
    const TestTeam_ = '2XmeNQWvwR97a3pCbENCIzBdApy'
    const data = await getTeamDesc(TestTeam)
    const data_ = await getTeamDesc(TestTeam_)
    data.teamMember = data.teamMember.map(member => {
      return { ...member, isPlaying: false };
    });
    data_.teamMember = data_.teamMember.map(member => {
      return { ...member, isPlaying: false };
    });
    this.homeTeamDetails = data
    this.visitingTeamDetails = data_
  }),
  /**
   * @param { string } id 队员id
   */
  updatePlaying: action(function (id) {
    for (let i = 0; i < this.homeTeamDetails.teamMember.length; i++) {
      let member = this.homeTeamDetails.teamMember[i];
      if (member.id === id) {
        // 修改isPlaying的值
        member.isPlaying = !member.isPlaying;
        break
      }
    }
    this.homeTeamDetails = { ...this.homeTeamDetails }
  }),
  /**
   * @param {string} match 比赛id
   * @param {string} user 选手id
   * @param {string} score 动作描述
   */
  updateMatchPoints: action(async function (match, user, score) {
    try {
      await updatMatchePoints(match,user,score)
    } catch (e) {

    }
  })
})
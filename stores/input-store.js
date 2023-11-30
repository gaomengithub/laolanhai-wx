import { observable, action } from "mobx-miniprogram"
import { getTeamDesc, updatMatchePoints, getMatchDesc, createMatchRound } from "$/utils/api"

export const input = observable({
  matchTeamsList: [
    {
      isSelect: false,
      name: "这就大队",
      teamMember: [
        {
          id: 'afs4dkj1',
          jerseyNumber: '15',
          isPlaying: false
        },
        {
          id: 'aefsdkj1',
          jerseyNumber: '13',
          isPlaying: false
        },
        {
          id: 'afsddkj1',
          jerseyNumber: '6',
          isPlaying: false
        },
        {
          id: 'afs4dkfj1',
          jerseyNumber: '8',
          isPlaying: false
        },
        {
          id: 'afsdaskj1',
          jerseyNumber: '11',
          isPlaying: false
        },
        {
          id: 'afsukdkj1',
          jerseyNumber: '25',
          isPlaying: false
        },
      ]
    },
    {
      isSelect: false,
      name: "老拉风队",
      teamMember: [
        {
          id: 'af86sdkj1',
          jerseyNumber: '15',
          isPlaying: false
        },
        {
          id: 'afsdwekj1',
          jerseyNumber: '13',
          isPlaying: false
        },
        {
          id: 'afsd85fdkj1',
          jerseyNumber: '6',
          isPlaying: false
        },
        {
          id: 'afssdcdkj1',
          jerseyNumber: '8',
          isPlaying: false
        },
        {
          id: 'afsdaemjkj1',
          jerseyNumber: '11',
          isPlaying: false
        },
        {
          id: 'afesdkj811',
          jerseyNumber: '25',
          isPlaying: false
        },
      ]
    },
    {
      isSelect: false,
      name: "晋城四少",
      teamMember: [
        {
          id: 'awef4fsdkj1',
          jerseyNumber: '15',
          isPlaying: false
        },
        {
          id: 'afsdgergkj1',
          jerseyNumber: '13',
          isPlaying: false
        },
        {
          id: 'aqe78fsdkj1',
          jerseyNumber: '6',
          isPlaying: false
        },
        {
          id: 'af952621sdkj1',
          jerseyNumber: '8',
          isPlaying: false
        },
        {
          id: 'afsd1fa5sdkj1',
          jerseyNumber: '11',
          isPlaying: false
        },
        {
          id: 'afswefdkj1',
          jerseyNumber: '25',
          isPlaying: false
        },
      ]
    },
  ],
  redTeamDetails: {
    name: "选择队伍"

  },
  blueTeamDetails: {
    name: "选择队伍"
  },

  activeMatchRound: action(async function (params) {
    try {
      await createMatchRound()
    } catch (e) {

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

import { observable, action } from "mobx-miniprogram"
import { getTeamDesc, updatMatchePoints } from "$/utils/api"

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

  /**
   * @param {'redTeamDetails' || 'blueTeamDetails'} key
   */
  updateTeamDetails: action(function (key, idx) {
    const teamDetails = this.matchTeamsList.filter(option => option.value == idx)[0]
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
    this.matchTeamsList = this.matchTeamsList.map(item => ({ ...item, text: item.name, value: item.name, icon: "" }))

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
   * @param {string} match 比赛id
   * @param {string} user 选手id
   * @param {string} score 动作描述
   */
  updateMatchPoints: action(async function (match, user, score) {
    try {
      await updatMatchePoints(match, user, score)
    } catch (e) {

    }
  })
})
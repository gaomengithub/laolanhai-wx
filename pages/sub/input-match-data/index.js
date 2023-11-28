import { createStoreBindings } from "mobx-miniprogram-bindings";
import { input } from "$/stores/input-store";

const homeOption = [
  { text: '队伍1', value: "队伍1", icon: "" },
  { text: '队伍2', value: "队伍2", icon: "" },
  { text: '队伍3', value: "队伍3", icon: "" },
]
const visitingOption = [
  { text: '队伍1', value: "队伍1", icon: "" },
  { text: '队伍2', value: "队伍2", icon: "" },
  { text: '队伍3', value: "队伍3", icon: "" },
]

Page({

  data: {
    homeTeam: "选择队伍",
    visitingTeam: "选择队伍",
    icon: {
      vs: "https://openstore.obabyball.com/ui_v1/icon/vs-v2.svg"
    },
    homeOption: [
      { text: '队伍1', value: "队伍1", icon: "" },
      { text: '队伍2', value: "队伍2", icon: "" },
      { text: '队伍3', value: "队伍3", icon: "" },
    ],
    visitingOption: [
      { text: '队伍1', value: "队伍1", icon: "" },
      { text: '队伍2', value: "队伍2", icon: "" },
      { text: '队伍3', value: "队伍3", icon: "" },
    ],
    radio: "",
    show: false,
    currMatchId: "",
    currAvatar: "",
    currName: "",
    currUserId: "",
  },

  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store: input,
      fields: ["homeTeamDetails", "visitingTeamDetails"],
      actions: ["getMatchTeams", "updatePlaying", "updateMatchPoints"],
    });
    if (options.id) {
      this.getMatchTeams(options.id)
      this.setData({
        currMatchId: options.id
      })
    }
  },

  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },

  onPlayingChange(e) {
    const id = e.currentTarget.dataset.id
    this.updatePlaying(id)
  },

  showPopup(e) {
    const item = e.currentTarget.dataset.item
    this.setData({
      show: true,
      currAvatar: item.avatar,
      currName: item.nickName,
      currUserId: item.id
    })
  },
  handleRecord(e) {
    this.updateMatchPoints(this.data.currMatchId, this.data.currUserId, parseInt(this.data.radio))
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  onRadioChange(e) {
    this.setData({
      radio: e.detail,
    });
  },
  onBeforeChange({ detail: { status, callback } }) {
    this.setData({
      visitingOption: visitingOption.filter(option => option.text !== this.data.homeTeam),
      homeOption: homeOption.filter(option => option.text !== this.data.visitingTeam)
    }, () => {
      callback(true)
    });

  },
  onDropdownChange(e) {
    const key = e.currentTarget.dataset.key
    this.setData({
      [key]: e.detail
    })
  }
})
import { createStoreBindings } from "mobx-miniprogram-bindings";
import { input } from "$/stores/input-store";
import { handleErr } from "../../../modules/msgHandler"
Page({
  data: {
    redTeamOptions: [],
    blueTeamOptions: [],
    icon: {
      vs: "https://openstore.obabyball.com/ui_v1/icon/vs-v2.svg"
    },
    radio: "",
    show: false,
    currPlayer: {},
    currMatchId: "",
  },

  start() {
    if (!this.data.redTeamDetails.id || !this.data.blueTeamDetails.id) {
      handleErr("需要选择球队")
      return
    }
    
    const countDown = this.selectComponent('.control-count-down');
    countDown.start();
  },

  pause() {
    const countDown = this.selectComponent('.control-count-down');
    countDown.pause();
  },

  reset() {
    const countDown = this.selectComponent('.control-count-down');
    countDown.reset();
  },

  finished() {
    Toast('倒计时结束');
  },

  // 防止滚定穿透
  lock() {

  },

  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store: input,
      fields: ["matchTeamsList", "redTeamDetails", "blueTeamDetails"],
      actions: ["updateMatchTeamsList", "updatePlaying", "updateMatchPoints", "updateTeamDetails"],
    });
    if (options.id) {
      this.updateMatchTeamsList(options.id)
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
    const key = e.currentTarget.dataset.key
    this.updatePlaying(key, id)
  },

  showPopup(e) {
    const item = e.currentTarget.dataset.item
    if (item) {
      this.setData({
        show: true,
        currPlayer: item
      })
    }
  },

  handleRecord(e) {
    const item = e.currentTarget.dataset.item
    const [score, current_score] = item.split("-")
    this.updateMatchPoints(this.data.currMatchId, this.data.currPlayer.id, score, current_score)
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
      redTeamOptions: this.data.matchTeamsList.filter(option => option.text !== this.data.blueTeamDetails.name),
      blueTeamOptions: this.data.matchTeamsList.filter(option => option.text !== this.data.redTeamDetails.name)
    }, () => {
      callback(true)
    });

  },
  onDropdownChange(e) {
    const key = e.currentTarget.dataset.key
    this.updateTeamDetails(key, e.detail)
  }
})
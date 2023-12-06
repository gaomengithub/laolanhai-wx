import { createStoreBindings } from "mobx-miniprogram-bindings";
import { match } from "$/stores//match-store"
Page({
  data: {
    tableHeader: [
      {
        prop: 'id',
        width: 150,
        label: '号码',
        color: '#55C355'
      },
      // {
      //   prop: 'tot',
      //   width: 152,
      //   label: '得分'
      // },
      {
        prop: 'hit_two_point',
        width: 152,
        label: '2分'
      },
      {
        prop: 'hit_three_point',
        width: 110,
        label: '3分'
      },
      {
        prop: 'hit_free_throw',
        width: 110,
        label: '罚球'
      },
      {
        prop: 'steal',
        width: 110,
        label: '犯规'
      }
    ],
    stripe: true,
    border: true,
    outBorder: true,

    msg: '暂无数据',

    img: "https://openstore.obabyball.com/ui_v1/img/banner-new.jpg",

    mvp: {
      nickName: "棒棒的我",
      avatar: "https://openstore.obabyball.com/ui_v1/icon/%E9%A3%9E%E8%B1%B9%20%281%29.png",
      jerseyNumber: "9"
    },
    // active: ['1', '2','3'],
    activeNames: ["1"],
    active: 0,
    steps: [
      {
        text: '时间-球队',
        desc: '描述事件',
      },
      {
        text: '时间-球队',
        desc: '描述事件',
      },
      {
        text: '时间-球队',
        desc: '描述事件',
      },
      {
        text: '时间-球队',
        desc: '描述事件',
      },
    ],
  },



  onChange(event) {
    this.setData({
      active: event.detail,
    });
  },
  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store: match,
      fields: ["matchResult", "matchInputData"],
      actions: ["updateMatchResult", "updateMatchInputData"]
    });
    if (options.id) {
      this.updateMatchResult(options.id)
      this.updateMatchInputData(options.id)
    }
  },

  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },
  afterRead(e) {
    const { file } = e.detail;
    this.updateMatchResult(file)
  },
  deleteImg(e) {
    const index = e.detail.index
    this.updateMatchResult(index)
  },
  tableDataChange() {
    let item = this.data.row[0];
    item.status = "不正常";
    this.setData({
      'row[0].status': "不正常"
    })
  },
  onCollapseChange(e) {
    this.setData({
      activeNames: e.detail,
    });
  },
})
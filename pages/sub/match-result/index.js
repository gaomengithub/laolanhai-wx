import { createStoreBindings } from "mobx-miniprogram-bindings";
import { match } from "$/stores//match-store"
Page({
  data: {



    tableHeader: [
      {
        prop: 'datetime',
        width: 150,
        label: '球员',
        color: '#55C355'
      },
      {
        prop: 'sign_in',
        width: 152,
        label: '得分'
      },
      {
        prop: 'sign_out',
        width: 152,
        label: '2分'
      },
      {
        prop: 'work_hour',
        width: 110,
        label: '3分'
      },
      {
        prop: 'status',
        width: 110,
        label: '罚球'
      }
    ],
    stripe: true,
    border: true,
    outBorder: true,
    row: [
      {
        "id": 1,
        "status": '正常',
        "datetime": "04-01",
        "sign_in": '09:30:00',
        "sign_out": '18:30:00',
        "work_hour": 8,
      }, {
        "id": 2,
        "status": '迟到',
        "datetime": "04-02",
        "sign_in": '10:30:00',
        "sign_out": '18:30:00',
        "work_hour": 7,
      }, {
        "id": 29,
        "status": '正常',
        "datetime": "04-03",
        "sign_in": '09:30:00',
        "sign_out": '18:30:00',
        "work_hour": 8,
      }, {
        "id": 318,
        "status": '休息日',
        "datetime": "04-04",
        "sign_in": '',
        "sign_out": '',
        "work_hour": '',
      }, {
        "id": 319,
        "status": '正常',
        "datetime": "04-05",
        "sign_in": '09:30:00',
        "sign_out": '18:30:00',
        "work_hour": 8,
      }
    ],
    msg: '暂无数据',








    mvp: {
      nickName: "棒棒的我",
      avatar: "https://openstore.obabyball.com/ui_v1/icon/%E9%A3%9E%E8%B1%B9%20%281%29.png",
      jerseyNumber: "9"
    },
    // active: ['1', '2','3'],
    active: 1,
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
      fields: ["matchResult",],
      actions: ["updateMatchResult"]
    });
    if (options.id) {
      this.updateMatchResult(options.id)
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
  }

})
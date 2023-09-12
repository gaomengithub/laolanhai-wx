import { getTeamApprovalList, getUserInfoByID, updateApproval } from '$/api'
Component({
  properties: {
    teamID: {
      type: String,
      value: ""
    }
  },

  data: {
    approvalRes: [],
    haveData: true,
  },
  lifetimes: {
    attached() {
      this.loadApprovalData()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadApprovalData() {
      if (this.data.teamID.length > 0) {
        getTeamApprovalList(this.data.teamID).then(resp => {
          if (resp.data != null && resp.data.length > 0) {
            const approvalRes = resp.data;
            const applierIDs = approvalRes.map(item => item.Applier.ID);
            return Promise.all(applierIDs.map(applierID => getUserInfoByID(applierID))).then(userRespList => {
              const dict = {};
              userRespList.forEach((item) => {
                dict[item.data.id] = item.data;
              });
              approvalRes.map(item => item["user"] = dict[item.Applier.ID]);
              this.setData({
                approvalRes,
                haveData: true
              });
            });
          } else {
            this.setData({
              haveData: false
            });
          }
        });
      }
    },

    onButtonClick(e) {

      const key = e.currentTarget.dataset.key
      const type = e.currentTarget.dataset.type
      const rev = e.currentTarget.dataset.rev
      wx.showModal({
        title: '填写回执',
        placeholderText: "填写同意或者驳回的理由",
        editable: true,
        complete: (res) => {
          if (res.cancel) {

          }

          if (res.confirm) {
            console.log(res)
            let obj = {
              "action": type,
              "approve_id": key,
              "comment": "string",
              "rev": rev + 1
            }
            wx.showLoading({
              title: '请等待',
            })
            updateApproval(obj).then(() => {
              wx.hideLoading()
              wx.showModal({
                title: '提示',
                content: '审批成功',
                showCancel: false,
                complete: (res) => {
                  if (res.confirm) {
                    this.loadApprovalData()
                  }
                }
              })
            })
          }
        }
      })
    }

  }
})

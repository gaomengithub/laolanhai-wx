import { yearMonth } from '$/util'
import { createStoreBindings } from "mobx-miniprogram-bindings";
import { handleErr } from '../../../modules/errorHandler'
import { user } from "../../../stores/user-store"

function createColumns(range, unit) {
  const arr = [];
  for (let i = range[0]; i <= range[1]; i++) {
    arr.push(i + unit);
  }
  return arr;
}

function formatter(type, value) {
  if (type === 'year') {
    return `${value}年`;
  }
  if (type === 'month') {
    return `${value}月`;
  }
  return `${value}日`;
}

// const computedBehavior = require('miniprogram-computed').behavior
Page({
  // behaviors: [computedBehavior],
  data: {
    heightColumns: [{ values: createColumns([140, 200], 'cm'), defaultIndex: 28 }],
    weightColumns: [{ values: createColumns([50, 100], 'kg'), defaultIndex: 18 }],
    minDate: new Date('1949-01-01').getTime(),
    formatter,
    showNameTip: false,
    showAvatarTip: false,
    showDatePicker: false,
    showWeightPicker: false,
    showHeightPicker: false,
  },



  onInput(event) {
    this.setData({
      date: event.detail,
      currentDate: formatDate(new Date(event.detail)),
    });
  },
  onChange(e) {
    const type = e.currentTarget.dataset.type
    this.setData({
      [type]: e.detail.value[0]
    })
  },
  // watch: {
  //   'avatarUrl, nickName': function (a, n) {
  //     if (a.length > 0 && n.length > 0) {
  //       this.setData({
  //         disabled: false
  //       })
  //     }
  //     if (a.length == 0 || n.length == 0) {
  //       this.setData({
  //         disabled: true
  //       })
  //     }
  //   }
  // },
  validate(e) {
    // 头像填写的验证的折中方法
    const key = e.currentTarget.dataset.key
    let data = null
    if (key == "showNameTip") {
      data = {
        nickName: this.data.nickName,
        avatarUrl: "stand"
      }
    }

    if (key == "showAvatarTip") {
      data = {
        nickName: 'stand',
        avatarUrl: this.data.avatarUrl
      }
    }

    if (!this.WxValidate.checkForm(data)) {
      this.setData({
        [key]: true
      })
    } else {
      this.setData({
        [key]: false,
      })
    }
  },
  onClose(e) {
    const key = e.currentTarget.dataset.key
    this.setData({
      [key]: false
    })
  },



  getPhoneNumber(e) {
    wx.showLoading({
      title: '请等待',
    })
    const userData = {
      id: wx.getStorageSync('id'),
      nickName: this.data.nickName,
      phoneCode: e.detail.code,
      avatar: this.data.avatarKey
    }
    updateUserInfo(userData).then(() => {
      wx.hideLoading()
      wx.showModal({
        content: '注册成功',
        showCancel: false,
        complete: (res) => {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/home/index',
            })
          }
        }
      })
      // 主要是更新缓存
      loginForToken().then(res => {
        setStorage(res)
      })
    })
  },

  onDisplay(e) {
    const show = e.currentTarget.dataset.show
    const curr = this.data[show]
    this.setData({
      [show]: !curr
    })
  },

  onChooseAvatar(e) {
    const form = {
      avatarUrl: e.detail.avatarUrl
    }
    console.log(form)
    this.updateUserInfo(form)
  },







  initValidate() {
    const rules = {
      avatarUrl: {
        required: true
      },
      nickName: {
        required: true
      },
    }
    const messages = {
      avatarUrl: {
        required: '需要选择头像'
      },
      nickName: {
        required: '昵称不能为空'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  handler(e) {
    console.log(e)
    const key = e.currentTarget.dataset.key
    let val = e.detail
    if (key == 'birthDate') {
      const date = new Date(e.detail)
      val = yearMonth(date)
    }
    if (key == 'height' || key == 'weight') {
      val = e.detail.value[0]
    }
    if (e.type == 'confirm') {
      this.onDisplay(e)
    }
    const form = {
      [key]: val
    }
    this.updateUserInfo(form)
  },
  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store: user,
      fields: ["user", "isUser"],
      actions: ["updateUserInfo"],
    });

    const id = options.id
    const page = options.page
    if (id && page) {

    }
    else {
      handleErr("页面参数错误")
    }

  },

  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },
})
import { formatDate } from '$/utils/util'
import { createStoreBindings } from "mobx-miniprogram-bindings";
import { user } from "$/stores/user-store"

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

Page({
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

  onUpdateUserInfo() {
    this.activeUser()
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
    this.updateUserForm(form)
  },


  handler(e) {
    const key = e.currentTarget.dataset.key
    let val = e.detail
    if (key == 'birthDate') {
      const date = new Date(e.detail)
      val = formatDate(date)
    }
    if (key == 'height' || key == 'weight') {
      val = e.detail.value[0].replace("cm", "")
    }
    if (e.type == 'confirm') {
      this.onDisplay(e)
    }
    const form = {
      [key]: val
    }
    this.updateUserForm(form)
  },

  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store: user,
      fields: ["userForm", "isUser"],
      actions: ["updateUserForm", "activeUser"],
    });
    this.updateUserForm()
  },

  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },
})
import { options } from '$/utils/pca-code'
import { createStoreBindings } from "mobx-miniprogram-bindings";
import { team } from "$/stores/team-store"

Page({
  data: {
    options: options,
    fieldNames: {
      text: 'text',
      value: 'text',
      children: 'children',
    },
    autoSize: { minHeight: 85 },
    showAreaCascader: false,
    icon: {
      upload: 'https://openstore.obabyball.com/ui_v1/icon/add-upload-v1.svg',
      name: 'https://openstore.obabyball.com/ui_v1/icon/add-team-name-v1.svg',
      intro: 'https://openstore.obabyball.com/ui_v1/icon/add-team-intro-v1.svg',
      location: 'https://openstore.obabyball.com/ui_v1/icon/add-team-location-v1.svg',
      address: 'https://openstore.obabyball.com/ui_v1/icon/add-team-address-v1.svg',
      member: 'https://openstore.obabyball.com/ui_v1/icon/member.svg'
    },

  },
  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },

  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store: team,
      fields: ["teamForm"],
      actions: ["updateTeamForm", "activeTeam", "initTeamForm"],
    });

    if (options.page == 'new') {
      this.initTeamForm()
    }
    else if (options.page == 'modify' && options.id) {
      this.updateTeamForm(options.id)
    } else {
      handleErr("参数非法")
    }
  },
  onBtnClick() {
    //校验表单



  },
  onAfterRead(event) {
  },

})
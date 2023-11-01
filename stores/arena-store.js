import { observable, action } from "mobx-miniprogram"
import { createArena, getArenas } from '$/api'
import { uploadImgWithToken } from '$/qiniu/qiniu'
import { arenaFormMessages, arenaFormRules } from '$/validate-set'
import WxValidate from '$/WxValidate'
import { handleErr } from '../modules/msgHandler'

export const arena = observable({
  validate: new WxValidate(arenaFormRules, arenaFormMessages),
  arenaForm: {
    id: null,
    files: [],
    attachments: [],
    name: '',
    year: '',
    start_time: '10:00',
    end_time: '18:00',
    region: '',
    city: '',
    address: '',
    price: '',
    date: '',
  },
  arenas: [
    {
      address: "玄武路233号",
      city: "西安市",
      desc: "string",
      id: "string",
      name: "天天向上球馆",
      start_time: "8:00",
      end_time: "18:00",
      phone: "string",
      price: "string",
      region: "陕西省",
      poster: "https://openstore.obabyball.com/ui_v1/img/test-arena-poster.jpg"
    }
  ],

  activeArena: action(async function () {
    const patch = {
      files_count: this.arenaForm.files.length,
      attachments: this.arenaForm.files.map(item => item.key)
    }
    const form = { ...this.arenaForm, ...patch }
    if (!this.validate.checkForm(form)) {
      const error = this.validate.errorList[0];
      wx.showModal({
        title: '错误',
        content: error.msg,
        showCancel: false,
        complete: (res) => {
          if (res.confirm) {

          }
        }
      })
    }
    else {
      if (!this.arenaForm.id) {
        // 新建
        try {
          await createArena(this.arenaForm)
        } catch (e) {

        }
      }
    }
  }),

  updateArenaForm: action(async function (params) {
    if (params.tempFilePath) {
      var _this = this
      wx.compressImage({
        src: params.tempFilePath,
        quality: 10,
        success: async function (res) {
          const data = await uploadImgWithToken(res.tempFilePath)
          const item = { url: params.tempFilePath, isImage: true }
          _this.arenaForm.files.push({ ...data, ...item })
          // 部分更新
          _this.arenaForm = Object.assign({}, _this.arenaForm, { files: _this.arenaForm.files })
        }
      })
    }
    else if (typeof params === 'number') {
      //用来删除上传的图片
      this.arenaForm.files.splice(params, 1)
      this.arenaForm = Object.assign({}, this.arenaForm, { files: this.arenaForm.files })
    }
    else {
      this.arenaForm = { ...this.arenaForm, ...params }
    }
  }),





  updateArenas: action(async function () {
    try {
      const data = await getArenas()
      if (data.list) {
        // this.arenas = data.list
      } else {
        // this.arenas = null
        throw new Error("获取球馆列表错误")
      }

    } catch (e) {

    }

  }),

})
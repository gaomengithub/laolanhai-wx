import { observable, action } from "mobx-miniprogram"
import { createArena, getArenas, getArenaDetails, delArena } from '$/utils/api'
import { uploadImgWithToken } from '$/utils/qiniu/qiniu'
import { arenaFormMessages, arenaFormRules } from '$/utils/validate/validate-set'
import WxValidate from '$/utils/validate/WxValidate'
import { handleErr, handleInfo } from '../modules/msgHandler'

export const arena = observable({
  validate: new WxValidate(arenaFormRules, arenaFormMessages),
  arenaDetails: {},
  arenaForm: {
  },
  arenasList: null,


  initArenaForm: action(async function (params) {
    let backup = JSON.parse(JSON.stringify(arenaFormBackup));
    this.arenaForm = JSON.parse(JSON.stringify(backup));
  }),

  updateArenaDetails: action(async function (params) {
    if (params) {
      // const data = this.arenasList.filter(item => item.id == params)[0]
      // this.arenaDetails = data
      const data = await getArenaDetails(params)
      this.arenaDetails = data
    }

  }),
  deleteArena: action(async function (params) {
    try {
      await delArena(params)
    } catch (e) {

    }
  }),
  activeArena: action(async function () {
    const patch = {
      files_count: this.arenaForm.files.length,
      attachments: this.arenaForm.files.map(item => item.key),
      city:this.arenaForm.region.split("/")[1]
    }
    const form = { ...this.arenaForm, ...patch }
    if (!this.validate.checkForm(form)) {
      const error = this.validate.errorList[0];
      handleErr(error.msg)
    }
    else {
      if (!this.arenaForm.id) {
        // 新建
        try {
          await createArena(form)
          handleInfo("创建成功", wx.navigateBack)
        } catch (e) {
          handleErr("创建失败")
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
    else if (typeof params == 'string') {
      const data = await getArenaDetails(params)
      this.initArenaForm()
      const patch = {

      }
      this.arenaForm = { ...this.arenaForm, ...data }
    }
    else {
      this.arenaForm = { ...this.arenaForm, ...params }
    }
  }),



  updateArenasList: action(async function () {
    try {
      const data = await getArenas()
      if (data.list) {
        this.arenasList = data.list
      } else {
        this.arenas = null
      }
    } catch (e) {
      handleErr("获取场馆列表出错")
    }
  }),
})


let arenaFormBackup = {
  id: null,

  attachments: [],
  desc:'',
  name: '',
  openYear: '',
  endTiem: '18:00',
  startTime: '10:00',
  region: '',
  city: '',
  address: '',
  price: '',
  date: '',
  // 自有
  files: [],
}
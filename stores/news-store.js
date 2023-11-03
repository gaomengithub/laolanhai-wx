import { observable, action } from "mobx-miniprogram"
import { newsFormMessages, newsFormRules } from '$/utils/validate/validate-set'
import WxValidate from '$/utils/validate/WxValidate'
import { createNews, getNewsList, getNewsDetails, delNews } from '$/utils/api'
import { uploadImgWithToken } from '$/utils/qiniu/qiniu'
import { handleErr, handleInfo } from '../modules/msgHandler'
export const news = observable({
  validate: new WxValidate(newsFormRules, newsFormMessages),
  newsForm: {
    id: '',
    title: '',
    content: '',
    date: '',
    region: '',
    attachments: [],
    // 自有字段
    files: []
  },
  newsList: null,
  newsDetails: null,

  initNewsForm: action(function () {
    let backup = JSON.parse(JSON.stringify(newsFormBackup));
    this.newsForm = JSON.parse(JSON.stringify(backup));
  }),
  deleteNews: action(async function (id) {
    try {
      await delNews(id)
      this.updateNewsForm()
      handleInfo("删除成功", wx.navigateBack)
    } catch (e) {
      handleErr("删除失败")
    }
  }),

  updateNewsDetails: action(async function (params) {
    try {
      const data = await getNewsDetails(params)
      this.newsDetails = data
    } catch (e) {

    }
  }),
  updateNewsList: action(async function (params) {
    try {
      const data = await getNewsList()
      this.newsList = data
    } catch (e) {

    }
  }),
  updateNewsForm: action(async function (params) {
    if (params.tempFilePath) {
      var _this = this
      wx.compressImage({
        src: params.tempFilePath,
        quality: 10,
        success: async function (res) {
          const data = await uploadImgWithToken(res.tempFilePath)
          const item = { url: params.tempFilePath, isImage: true }
          _this.newsForm.files.push({ ...data, ...item })
          // 部分更新
          _this.newsForm = Object.assign({}, _this.newsForm, { files: _this.newsForm.files })
        }
      })
    }
    else if (typeof params === 'number') {
      this.newsForm.files.splice(params, 1)
      this.newsForm = Object.assign({}, this.newsForm, { files: this.newsForm.files })
    }
    else if (typeof params === 'string') {
      const data = await getNewsDetails(params)
      this.newsForm = { ...this.newsForm, ...data }
    }
    else {
      this.newsForm = { ...this.newsForm, ...params }
    }
  }),
  activeNews: action(async function (params) {
    const patch = {
      attachments: this.newsForm.files.map(item => item.key)
    }
    const form = { ...this.newsForm, ...patch }
    if (!this.validate.checkForm(form)) {
      const error = this.validate.errorList[0]
      handleErr(error.msg)
    } else {
      if (!this.newsForm.id) {
        // 新建
        try {
          await createNews(form)
          handleInfo("创建资讯功")
        } catch {
          handleErr("创建资讯失败")
        }
      }
    }
  })

})


let newsFormBackup = {
  id: '',
  title: '',
  content: '',
  date: '',
  region: '',
  attachments: [],
  // 自有字段
  files: []
}
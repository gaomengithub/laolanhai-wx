import { observable, action } from "mobx-miniprogram"
import { newsFormMessages, newsFormRules } from '$/utils/validate/validate-set'
import WxValidate from '$/utils/validate/WxValidate'
import { createNews, getNewsList, getNewsDetails } from '$/utils/api'
import { uploadImgWithToken } from '$/utils/qiniu/qiniu'
import { handleErr } from '../modules/msgHandler'
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

  updateNewsDetails: action(async function (params) {
    try {
      const data = await getNewsDetails(params)
      this.newsDetails = data
      console.log(data)
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
      console.log(error)
    } else {
      if (!this.newsForm.id) {
        // 新建
        try {
          await createNews(form)
        } catch {

        }
      }
    }
  })

})
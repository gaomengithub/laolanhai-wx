import { observable, action } from "mobx-miniprogram"

export const news = observable({
  newsForm: [],
  news: null,
  news_: null, //单条

  updateNews_: action(async function (params) {

  }),
  updateNews: action(async function (params) {

  }),
  updateNewsForm: action(async function (params) {

  }),
  activeNews: action(async function (params) {

  })

})
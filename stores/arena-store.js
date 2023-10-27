import { observable, action } from "mobx-miniprogram"
import { createArena, getArenas } from '$/api'

export const arena = observable({
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
  createArena: action(async function (data) {
    try {
      await createArena(data)
    } catch (e) {

    }
  })
})
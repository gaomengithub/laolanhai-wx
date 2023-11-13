import { searchLetter, cityList } from './city.js';
import { createStoreBindings } from "mobx-miniprogram-bindings";
import { match } from "$/stores/match-store";
Page({
  data: {
    navTitle: "城市选择",
    locationIcon: 'https://openstore.obabyball.com/ui_v1/icon/city-location-v1.svg',
    searchLetter: searchLetter,
    showLetter: "",
    sortedCityList: [],
    scrollTop: 0,//置顶高度
    scrollTopId: '',//置顶id
    city: "定位中...",
    province:"",
    hotcityList: ["全国", "北京市", "成都市", "西安市", "海口市", "大连市", "南京市", "天津市", "深圳市"],
    inputName: '',
    completeList: [],
  },
  onLoad(options) {
    var _this = this
    wx.getFuzzyLocation({
      type: 'gcj02',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        _this.getCity(latitude, longitude)
      }
    })
    const sortedCityList = cityList.reduce((acc, val) => {
      const key = val.short[0];
      if (!acc[key]) acc[key] = [];
      acc[key].push(val.city);
      return acc;
    }, {});
    this.setData({
      sortedCityList
    })

    this.storeBindings = createStoreBindings(this, {
      store: match,
      actions: ["modifyOptions"],
    });
  },
  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },
  // 获取定位城市名称方法
  getCity: function (latitude, longitude) {
    const prefix = 'https://apis.map.qq.com/ws/geocoder/v1/?key=5KUBZ-B5PK3-QAN3L-OGC4J-JUIPK-UDFQU&location='
    wx.request({
      url: prefix + latitude + ',' + longitude,
      success: res => {
        if (res.data.message == "query ok") {
          const city = res.data.result.address_component.city
          const province = res.data.result.address_component.province
          this.setData({
            city: city,
            province: province
          })
        }
      }
    })
  },

  clickLetter(e) {
    const showLetter = e.currentTarget.dataset.letter;
    this.setData({
      scrollTopId: showLetter,
    })
    wx.showToast({
      title: showLetter,
      icon: "none"
    })
  },
  //选择城市
  bindCity: function (e) {

    const filter = {
      city: e.currentTarget.dataset.city == '全国' ? '' : e.currentTarget.dataset.city
    }
    this.modifyOptions(filter)

    this.setData({
      // city: e.currentTarget.dataset.city,
      scrollTop: 0,
      completeList: [],
    })
    wx.showToast({
      title: "已选择" + e.currentTarget.dataset.city,
      icon: "none",
      complete() {
        wx.navigateBack()
      }
    })
  },

  bindKeyInput: function (e) {
    this.setData({
      inputName: e.detail
    })
    const val = e.detail.toLowerCase()
    const completeList = cityList.reduce((accumulator, currentItem) => {
      if (currentItem.city.indexOf(val) !== -1 || currentItem.short.toLowerCase().indexOf(val) !== -1) {
        accumulator.push(currentItem);
      }
      return accumulator;
    }, []);
    this.setData({
      completeList
    })
  },
})

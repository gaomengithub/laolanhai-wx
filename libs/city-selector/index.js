import { searchLetter, cityList } from './city.js';
import { iconUrls } from '../../utils/urls'
const app = getApp()
Page({
  data: {
    navTitle: "城市选择",
    locationIcon: iconUrls.cityLocation,
    searchLetter: searchLetter,
    showLetter: "",
    sortedCityList: [],
    scrollTop: 0,//置顶高度
    scrollTopId: '',//置顶id
    city: "定位中...",
    navBarHeight: app.globalData.navBarHeight,
    hotcityList: ["北京市", "成都市", "西安市", "海口市", "大连市", "南京市", "天津市", "深圳市"],
    inputName: '',
    completeList: [],
  },
  onLoad(options) {
    const sortedCityList = cityList.reduce((acc, val) => {
      const key = val.short[0];
      if (!acc[key]) acc[key] = [];
      acc[key].push(val.city);
      return acc;
    }, {});
    this.setData({
      sortedCityList
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
    this.setData({
      city: e.currentTarget.dataset.city,
      scrollTop: 0,
      completeList: [],
    })

    app.globalData.currCity = e.currentTarget.dataset.city

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

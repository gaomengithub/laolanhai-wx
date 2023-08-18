import { searchLetter, sortedCityList ,cityObjs } from './city.js';

const app = getApp()
Page({
  data: {
    navTitle: "定位",
    searchLetter: searchLetter,
    showLetter: "",
    cityList: sortedCityList,
    isShowLetter: false,
    scrollTop: 0,//置顶高度
    scrollTopId: '',//置顶id
    city: "定位中",
    currentCityCode: '',
    navBarHeight: app.globalData.navBarHeight,
    hotcityList: ["北京市", "成都市", "西安市", "海口市", "大连市", "南京市", "天津市", "深圳市"],
    inputName: '',
    completeList: [],
  },
  onLoad: function (options) {
    // const back_url = options.back_url;
    // this.getLocation();
  },

  clickLetter: function (e) {
    const showLetter = e.currentTarget.dataset.letter;
    this.setData({
      toastShowLetter: showLetter,
      isShowLetter: true,
      scrollTopId: showLetter,
    })
    const that = this;
    setTimeout(function () {
      that.setData({
        isShowLetter: false
      })
    }, 500)
  },
  //选择城市
  bindCity: function (e) {
    this.setData({
      condition: true,
      city: e.currentTarget.dataset.city,
      currentCityCode: e.currentTarget.dataset.code,
      scrollTop: 0,
      completeList: [],
    })

  },

  bindKeyInput: function (e) {
    this.setData({
      inputName: e.detail
    })
    this.auto()
  },
  auto: function () {
    let inputSd = this.data.inputName.trim()
    let sd = inputSd.toLowerCase()
    let filterData = function(data, key) {
      return data.filter(
        item => {
          let keyValue = item[key] ? item[key].toString().slice(0, sd.length).toLowerCase() : '';
          return keyValue == sd
        }
      )
    }

    let finalCityList = []

    let filterProperties = ["short", "shorter", "city"];
    let tempArray;
    for(let i = 0; i < filterProperties.length; i++) {
      tempArray = filterData(cityObjs, filterProperties[i]);
      if (tempArray.length > 0) break;
    } 

    if (tempArray.length > 0) {
      tempArray.map(item => {
        let tempObj = {};
        tempObj.city = item.city
        tempObj.code = item.code
        finalCityList.push(tempObj)
      })
    }

    this.setData({
      completeList: finalCityList,
    })
  },
})

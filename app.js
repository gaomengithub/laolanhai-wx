import { setStorage } from 'modules/tokenManager/tokenHandler';
import { loginForToken } from './modules/tokenManager/getToken'
App({
  onLaunch() {
    const systemInfo = wx.getSystemInfoSync();
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    this.globalData.navBarHeight = systemInfo.statusBarHeight + 44;
    this.globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.right;
    this.globalData.menuTop = menuButtonInfo.top;
    this.globalData.menuHeight = menuButtonInfo.height;
    this.globalData.windowHeight = systemInfo.windowHeight;
    loginForToken().then(res=>{
      setStorage(res)
    })
  },
  globalData: {
    events: {
      ON_CITY_CHANGE: [],
    },
    setEvent(name, fn) {
      this.events[name].push(fn);
    },
    removeEvent(name, fn) {
      const fns = this.events[name];
      if (!fns) return;
      for (let i = 0; i < fns.length; i++) {
        if (fns[i] === fn) {
          fns.splice(i, 1);
          break;
        }
      }
    },
    fire(name, params) {
      const fns = this.events[name];
      if (!fns) return;
      fns.forEach(fn => {
        fn(params);
      });
    },
    setCity(city) {
      this.currCity = city;
      this.fire("ON_CITY_CHANGE", city);
    },
    navBarHeight: 0, // 导航栏高度
    menuRight: 0, // 胶囊距右方间距（方保持左、右间距一致）
    menuTop: 0, // 胶囊距底部间距（保持底部间距一致）
    menuHeight: 0, // 胶囊高度（自定义内容可与胶囊高度保证一致）
    windowHeight:0,
    currCity: "全国",
    currDate: "全部时间",
  }
})
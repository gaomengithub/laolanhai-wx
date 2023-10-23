import { setStorage } from 'modules/tokenManager/tokenHandler';
import { loginForToken } from './modules/tokenManager/getToken'
import  Common  from 'models/common'

App({
  onLaunch() {
    this.globalData.common = new Common()
    
    loginForToken().then(res => {
      setStorage(res)
    })
  },
  globalData: {
    events: {
      ON_CITY_CHANGE: [],
      ON_TEAM_CHANGE: []
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
    refreshTeamList() {
      this.fire("ON_TEAM_CHANGE")
    },

    currCity: "全国",
    currDate: "全部时间",
    common: null,
  }
})
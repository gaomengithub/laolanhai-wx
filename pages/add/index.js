import { createMatch } from '../../utils/api'
const app = getApp()

const options = [{
  text: '浙江省',
  value: '330000',
  children: [{
    text: '杭州市',
    value: '330100'
  }],
},
{
  text: '江苏省',
  value: '320000',
  children: [{
    text: '南京市',
    value: '320100'
  }],
},
];

Page({
  data: {
    options: options,
    type: 3,
    navTitle: "创建",
    autoSize: { minHeight: 50 },
    formattedDate:"",
    //form data
    name: "测试",
    desc: "测试",
    currDate: '',
    startTime: "11:00",
    endTime: "12:00",
    currArea: "",
    address: "",
    joinNum: "12",
    startAge: "45",
    endAge: "55",
    // 页面控制
    minHour: 10,
    maxHour: 20,
    showStartTimePicker: false,
    showEndTimePicker: false,
    showCalendar: false,
    showMatchTpyePicker: false,
    showAreaCascader: false,
    navBarHeight: app.globalData.navBarHeight,
    //上传
    fileList: [],
  },

  onLoad(options) {
    const date = new Date()
    this.setData({
      date: this.formatDate(date)
    })
    try {
      this.setData({
        type: options.type
      })
    } catch (e) {
      console.log("获取页面参数错误")
    }
  },
  onDisplay(e) {
    const show = e.currentTarget.dataset.show
    this.setData({
      [show]: true
    })
  },
  onClose(e) {
    const show = e.currentTarget.dataset.show
    this.setData({
      [show]: false
    })
  },
  onInput(e) {
    const key = e.currentTarget.dataset.key
    this.setData({
      [key]: e.detail
    })
  },
  onConfirm(e) {
    const key = e.currentTarget.dataset.key
    const show = e.currentTarget.dataset.show
    this.setData({
      [show]: false,
      [key]: key == "currDate"? this.formatDate(e.detail) : e.detail
    })
  },
  onChange(e) {
    const key = e.currentTarget.dataset.key
    this.setData({
      [key]: e.detail
    })
  },
  onFinishAreaCascader(e) {
    const { selectedOptions } = e.detail
    const fieldValue = selectedOptions.map((option) => option.text || option.name).join('/');
    this.setData({
      showAreaCascader: false,
      currArea: fieldValue
    })
  },

  formatDate(date) {
    date = new Date(date);
    let year = date.getFullYear(); // 获取年份
    let month = date.getMonth() + 1; // 获取月份，月份从0开始所以加1
    let day = date.getDate(); // 获取日期
    let formattedDate = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
    this.setData({
      formattedDate:formattedDate
    })
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  },

  onCreateBtn() {
    
    let data = {
      age_group_start: parseInt(this.data.startAge),
      age_group_end: parseInt(this.data.endAge),
      attachments: "asdfasfasdfsdafsdfasdf",
      banner_attachments: "asdfasfasdfasd",
      description: this.data.desc,
      end_time: this.data.formattedDate + 'T' + this.data.endTime + ':00Z',
      start_time: this.data.formattedDate + 'T' + this.data.startTime + ':00Z',
      join_num: parseInt(this.data.joinNum),
      location: this.data.currArea + this.data.address,
      match_type: parseInt(this.data.type),
      name: this.data.name,
      // organizer: "",
    }
    createMatch(data).then(res=>{
      if(res.statusCode == "200"){
        wx.navigateTo({
          url: '/pages/desc/index',
        })
      }
    }).catch(e=>{
      console.log(e)
    })
  }
})
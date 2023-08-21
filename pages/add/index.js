import { createMatch ,uploadImage } from '../../utils/api'
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

let fileList=[]

Page({
  data: {
    options: options,
    type: 3,
    navTitle: "创建",
    autoSize: { minHeight: 50 },
    formattedDate: "",
    iconUrl: {
      date: "http://ryt5dzeq0.hn-bkt.clouddn.com/dev/background/calendar-50.png",
      startTime: "http://ryt5dzeq0.hn-bkt.clouddn.com/dev/background/start-time.svg",
      endTime: "http://ryt5dzeq0.hn-bkt.clouddn.com/dev/background/icons8-delivery-time-50.png",
      startAge: "http://ryt5dzeq0.hn-bkt.clouddn.com/dev/background/icons8-up-50.png",
      endAge: "http://ryt5dzeq0.hn-bkt.clouddn.com/dev/background/icons8-down-50.png",
      cost: "http://ryt5dzeq0.hn-bkt.clouddn.com/dev/background/icons8-cost-50.png",
      upload: "http://ryt5dzeq0.hn-bkt.clouddn.com/dev/background/upload-img.svg"
    },
    //form data
    name: "",
    desc: "",
    currDate: '',
    startTime: "",
    endTime: "",
    currArea: "",
    address: "",
    joinNum: "",
    startAge: "",
    endAge: "",
    currCost: "免费",
    // 页面控制
    minHour: 10,
    maxHour: 20,
    showStartTimePicker: false,
    showEndTimePicker: false,
    showCalendar: false,
    showMatchTpyePicker: false,
    showAreaCascader: false,
    showCostAction: false,
    costActions: [{ name: "免费" }, { name: "约10元" }, { name: "约20元" }, { name: "约30元" }],
    navBarHeight: app.globalData.navBarHeight,
    //上传
    fileList: [],
  },

  onLoad(options) {
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
    let val = e.detail
    if (key == "currDate") {
      val = this.formatDate(e.detail)
    } else if (key == "currCost") {
      val = e.detail.name
    }
    this.setData({
      [show]: false,
      [key]: val
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
      formattedDate: formattedDate
    })
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  },


  onAfterRead(event) {
    const that = this
    const { file } = event.detail;
    wx.compressImage({
      src: file.url,
      quality:50,
      success(res){
        const obj ={
          url: res.tempFilePath,
          isImage: true,
          name: '图片2',
        }
        fileList.push(obj)
        console.log(fileList)
        that.setData({
          fileList:fileList
        })
        // uploadImage(res.tempFilePath,"upload-url").then(res=>{
        //   console.log(res)
        // })
      }
    })
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
      // price: this.data.currCost
      // organizer: "",
    }
    createMatch(data).then(res => {
      if (res.statusCode == "200") {
        wx.showToast({
          title: '创建成功',
          icon:"success",
          duration:"3000",
          success(){
            wx.switchTab({
              url: '/pages/home/index',
            })
          }
        })
      }
    }).catch(e => {
      console.log(e)
    })
  }
})
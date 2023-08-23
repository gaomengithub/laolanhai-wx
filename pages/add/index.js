import { createMatch, uploadImage } from '../../utils/api'
import WxValidate from '../../utils/WxValidate'
const app = getApp()

const options = [{
  "text": "北京", 
  "value": "110000",
  "children": [
    {
      "text": "北京市", 
      "value": "110100"
    }
  ]
},
{
  "text": "天津",
  "value": "120000", 
  "children": [
    {
      "text": "天津市",
      "value": "120100"  
    }
  ]
}, 
{
  "text": "河北省",
  "value": "130000",
  "children": [
    {
      "text": "石家庄市",
      "value": "130100"
    },
    {
      "text": "唐山市",
      "value": "130200"
    }
  ]
},
{
  "text": "山西省",
  "value": "140000",
  "children": [
    {
      "text": "太原市",
      "value": "140100"
    },
    {
      "text": "大同市",
      "value": "140200"
    }
  ]
},
{
  "text": "内蒙古自治区",
  "value": "150000",
  "children": [
    {
      "text": "呼和浩特市",
      "value": "150100"
    },
    {
      "text": "包头市",
      "value": "150200"
    }
  ]
},
{
  "text": "辽宁省",
  "value": "210000",
  "children": [
    {
      "text": "沈阳市",
      "value": "210100"
    },
    {
      "text": "大连市",
      "value": "210200"
    }
  ]
},
{
  "text": "吉林省",
  "value": "220000",
  "children": [
    {
      "text": "长春市",
      "value": "220100"
    },
    {
      "text": "吉林市",
      "value": "220200"
    }
  ]
},
{
  "text": "黑龙江省",
  "value": "230000",
  "children": [
    {
      "text": "哈尔滨市",
      "value": "230100"
    },
    {
      "text": "齐齐哈尔市",
      "value": "230200"
    }
  ]
},
{
  "text": "上海",
  "value": "310000",
  "children": [
    {
      "text": "上海市",
      "value": "310100"
    }
  ]
},
{
  "text": "江苏省",
  "value": "320000",
  "children": [
    {
      "text": "南京市",
      "value": "320100"
    },
    {
      "text": "无锡市",
      "value": "320200"
    }
  ]
},
{
  "text": "浙江省",
  "value": "330000",
  "children": [
    {
      "text": "杭州市",
      "value": "330100"
    },
    {
      "text": "宁波市",
      "value": "330200"
    }
  ]
},
{
  "text": "安徽省",
  "value": "340000",
  "children": [
    {
      "text": "合肥市",
      "value": "340100"
    },
    {
      "text": "芜湖市",
      "value": "340200"
    }
  ]
},
{
  "text": "福建省",
  "value": "350000",
  "children": [
    {
      "text": "福州市",
      "value": "350100"
    },
    {
      "text": "厦门市",
      "value": "350200"
    }
  ]
},
{
  "text": "江西省",
  "value": "360000",
  "children": [
    {
      "text": "南昌市",
      "value": "360100"
    },
    {
      "text": "景德镇市",
      "value": "360200"
    }
  ]
},
{
  "text": "山东省",
  "value": "370000",
  "children": [
    {
      "text": "济南市",
      "value": "370100"
    },
    {
      "text": "青岛市",
      "value": "370200"
    }
  ]
},
{
  "text": "河南省",
  "value": "410000",
  "children": [
    {
      "text": "郑州市",
      "value": "410100"
    },
    {
      "text": "开封市",
      "value": "410200"
    }
  ]
},
{
  "text": "湖北省",
  "value": "420000",
  "children": [
    {
      "text": "武汉市",
      "value": "420100"
    },
    {
      "text": "黄石市",
      "value": "420200"
    }
  ]
},
{
  "text": "湖南省",
  "value": "430000",
  "children": [
    {
      "text": "长沙市",
      "value": "430100"
    },
    {
      "text": "株洲市",
      "value": "430200"
    }
  ]
},
{
  "text": "广东省",
  "value": "440000",
  "children": [
    {
      "text": "广州市",
      "value": "440100"
    },
    {
      "text": "深圳市",
      "value": "440200"
    }
  ]
},
{
  "text": "广西壮族自治区",
  "value": "450000",
  "children": [
    {
      "text": "南宁市",
      "value": "450100"
    },
    {
      "text": "柳州市",
      "value": "450200"
    }
  ]
},
{
  "text": "海南省",
  "value": "460000",
  "children": [
    {
      "text": "海口市",
      "value": "460100"
    },
    {
      "text": "三亚市",
      "value": "460200"
    }
  ]
},
{
  "text": "重庆",
  "value": "500000",
  "children": [
    {
      "text": "重庆市",
      "value": "500100"
    }
  ]
},
{
  "text": "四川省",
  "value": "510000",
  "children": [
    {
      "text": "成都市",
      "value": "510100"
    },
    {
      "text": "自贡市",
      "value": "510300"
    }
  ]
},
{
  "text": "贵州省",
  "value": "520000",
  "children": [
    {
      "text": "贵阳市",
      "value": "520100"
    },
    {
      "text": "六盘水市",
      "value": "520200"
    }
  ]
},
{
  "text": "云南省",
  "value": "530000",
  "children": [
    {
      "text": "昆明市",
      "value": "530100"
    },
    {
      "text": "曲靖市",
      "value": "530300"
    }
  ]
},
{
  "text": "西藏自治区",
  "value": "540000",
  "children": [
    {
      "text": "拉萨市",
      "value": "540100"
    },
    {
      "text": "日喀则市",
      "value": "540200"
    }
  ]
},
{
  "text": "陕西省",
  "value": "610000",
  "children": [
    {
      "text": "西安市",
      "value": "610100"
    },
    {
      "text": "铜川市",
      "value": "610200"
    }
  ]
},
{
  "text": "甘肃省",
  "value": "620000",
  "children": [
    {
      "text": "兰州市",
      "value": "620100"
    },
    {
      "text": "嘉峪关市",
      "value": "620200"
    }
  ]
},
{
  "text": "青海省",
  "value": "630000",
  "children": [
    {
      "text": "西宁市",
      "value": "630100"
    },
    {
      "text": "海东市",
      "value": "630200"
    }
  ]
},
{
  "text": "宁夏回族自治区",
  "value": "640000",
  "children": [
    {
      "text": "银川市",
      "value": "640100"
    },
    {
      "text": "石嘴山市",
      "value": "640200"
    }
  ]
},
{
  "text": "新疆维吾尔自治区",
  "value": "650000",
  "children": [
    {
      "text": "乌鲁木齐市",
      "value": "650100"
    },
    {
      "text": "克拉玛依市",
      "value": "650200"
    }
  ],
},
];

let fileList = []

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
    this.initValidate();
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
      quality: 50,
      success(res) {
        const obj = {
          url: res.tempFilePath,
          isImage: true,
          name: '图片2',
        }
        fileList.push(obj)
        console.log(fileList)
        that.setData({
          fileList: fileList
        })
        // uploadImage(res.tempFilePath,"upload-url").then(res=>{
        //   console.log(res)
        // })
      }
    })
  },
  onCreateBtn() {
    //校验表单
    const formData = {name:this.data.name,desc:this.data.desc,joinNum:this.data.joinNum,date:this.data.currDate,currArea:this.data.currArea,address:this.data.address,startAge:this.data.startAge,endAge:this.data.endAge}
    if (!this.WxValidate.checkForm(formData)) {
      const error = this.WxValidate.errorList[0];
      wx.showModal({
        content: error.msg,
        showCancel: false
      })
      return false;
    }

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
        wx.showModal({
          title: '创建成功',
          showCancel:false,
          complete: (res) => {
            if (res.confirm) {
              wx.switchTab({
                url: '/pages/home/index',
              })
            }
          }
        })
      }
    }).catch(e => {
      console.log(e)
    })
  },



  initValidate() {
    const rules = {
      name: {
        required: true
      },
      desc: {
        required: true
      },
      date: {
        required: true
      },
      currArea: {
        required: true,
      },
      address: {
        required: true,
      },
      joinNum: {
        required: true,
      },
      startAge: {
        required: true
      },
      endAge: {
        required: true
      }
    }
    const messages = {
      name: {
        required: '标题不能为空'
      },
      desc: {
        required: '描述不能为空'
      },
      date: {
        required: '日期不能为空'
      },
      currArea: {
        required: '地区不能为空',
      },
      joinNum: {
        required: '参加数量不能为空',
      },
      address: {
        required: '详细地址不能为空',
      },
      startAge: {
        required: '年龄上限不能为空'
      },
      endAge: {
        required: '年龄下限不能为空'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },



})
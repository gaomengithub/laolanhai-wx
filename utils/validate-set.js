// 创建比赛
export const addMatchRules = {
  imgCount: {
    min: 2
  },
  name: {
    required: true
  },
  desc: {
    required: true
  },
  date: {
    required: true
  },
  timeDiff: {
    min: 60
  },
  region: {
    required: true,
  },
  address: {
    required: true,
  },
  joinNum: {
    number: true,
    required: true,
  },
  startAge: {
    number: true,
    min: 45,
    required: true
  },
  endAge: {
    number: true,
    required: true
  },
  ageDiff: {
    min: 1
  },
}
export const addMatchMessages = {
  imgCount: {
    min: '图片需要上传两张'
  },
  name: {
    required: '标题不能为空'
  },
  desc: {
    required: '描述不能为空'
  },
  date: {
    required: '日期不能为空'
  },
  timeDiff: {
    min: '结束时间要大于开始时间60分钟'
  },
  region: {
    required: '地区不能为空',
  },
  joinNum: {
    number: '参加的数量必须是数字',
    required: '参加的数量（人、队伍）不能为空',
  },
  address: {
    required: '详细地址不能为空',
  },
  startAge: {
    number: '最小年龄的输入必须是数字',
    min: '最小年龄不能低于45岁',
    required: '最小年龄不能为空'
  },
  endAge: {
    number: '最大年龄的输入必须是数字',
    required: '最大年龄不能为空'
  },
  ageDiff: {
    min: '最大年龄要大于最小年龄'
  },
}

//创建球队
export const addTeamRules = {
  name: {
    required: true
  },
  intro: {
    required: true
  },
  city: {
    required: true
  },
  location: {
    required: true
  },
  imgCount: {
    min: 1
  },
  memberNum: {
    min: 1
  },

}

export const addTeamMessages = {
  name: {
    required: '球队名称不能为空'
  },
  intro: {
    required: '球队简介不能为空'
  },
  city: {
    required: '需要选择城市'
  },
  location: {
    required: '填写主要活动位置'
  },
  imgCount: {
    min: '需要上传队徽'
  },
  memberNum: {
    min: '球队人数不能少于8人'
  },

}



export const matchFormRules = {
  files_count: {
    min: 2
  },
  name: {
    required: true
  },
  description: {
    required: true
  },
  date: {
    required: true
  },
  time_diff: {
    min: 60
  },
  region: {
    required: true,
  },
  address: {
    required: true,
  },
  join_num: {
    number: true,
    required: true,
  },
  age_group_start: {
    number: true,
    min: 45,
    required: true
  },
  age_group_end: {
    number: true,
    required: true
  },
  age_diff: {
    min: 1
  },
  cost: {
    required: true
  },
}

export const matchFormMessages = {
  files_count: {
    min: '图片需要上传两张'
  },
  name: {
    required: '标题不能为空'
  },
  description: {
    required: '描述不能为空'
  },
  date: {
    required: '日期不能为空'
  },
  time_diff: {
    min: '结束时间要大于开始时间60分钟'
  },
  region: {
    required: '地区不能为空',
  },
  join_num: {
    number: '参加的数量必须是数字',
    required: '参加的数量（人、队伍）不能为空',
  },
  address: {
    required: '详细地址不能为空',
  },
  age_group_start: {
    number: '最小年龄的输入必须是数字',
    min: '最小年龄不能低于45岁',
    required: '最小年龄不能为空'
  },
  age_group_end: {
    number: '最大年龄的输入必须是数字',
    required: '最大年龄不能为空'
  },
  age_diff: {
    min: '最大年龄要大于最小年龄'
  },
  cost: {
    required: '需要选择费用'
  },
}

export const arenaFormRules = {
  files_count: {
    min: 2
  },
  name: {
    required: true
  },
  description: {
    required: true
  },
  date: {
    required: true
  },
  time_diff: {
    min: 60
  },
  region: {
    required: true,
  },
  address: {
    required: true,
  },
  price: {
    required: true
  },
}

export const arenaFormMessages = {
  files_count: {
    min: '图片需要上传两张'
  },
  name: {
    required: '标题不能为空'
  },
  description: {
    required: '描述不能为空'
  },
  date: {
    required: '开业时间不能为空'
  },
  time_diff: {
    min: '结束时间要大于开始时间60分钟'
  },
  region: {
    required: '地区不能为空',
  },
  join_num: {
    number: '参加的数量必须是数字',
    required: '参加的数量（人、队伍）不能为空',
  },
  address: {
    required: '详细地址不能为空',
  },
  price: {
    required: '需要选择费用'
  },
}

//创建球队
export const teamFormRules = {
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

export const teamFormMessages = {
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


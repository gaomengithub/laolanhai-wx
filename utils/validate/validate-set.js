export const userFormRules = {
  avatar: {
    required: true
  },
  nickName: {
    required: true
  },
  birthDate: {
    required: true
  },
  height: {
    required: true
  },
  weight: {
    required: true,
  },
  about: {
    required: true,
  },

}

export const userFormMessages = {
  avatar: {
    required: "需要上传头像",
  },
  nickName: {
    required: '昵称不能为空'
  },
  birthDate: {
    required: '需要选择出生日期'
  },
  height: {
    required: '需要输入身高',
  },
  weight: {
    required: '需要输入体重',
  },
  about: {
    required: '需要输入自我介绍'
  },
}

export const userFormRules_ = {
  avatar: {
    required: true
  },
  nickName: {
    required: true
  },
  birthDate: {
    required: true
  },
}

export const userFormMessages_ = {
  avatar: {
    required: "需要上传头像",
  },
  nickName: {
    required: '昵称不能为空'
  },
  birthDate: {
    required: '需要选择出生日期'
  }
}

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


export const customInputFormRules = {
  assist: {
    number: true,
    required: true
  },
  block: {
    number: true,
    required: true
  },
  hit_free_throw: {
    number: true,
    required: true
  },
  hit_three_point: {
    number: true,
    required: true
  },
  hit_two_point: {
    number: true,
    required: true
  },
  rebound: {
    number: true,
    required: true
  },
  steal: {
    number: true,
    required: true
  },
  total_free_throw: {
    number: true,
    required: true
  },
  total_three_point: {
    number: true,
    required: true
  },
  total_two_point: {
    number: true,
    required: true
  },
  diff: {
    min: 0
  }
}

export const customInputFormMessages = {
  assist: {
    number: "需要输入数字",
    required: "助攻数需要输入"
  },
  block: {
    number: "需要输入数字",
    required: "盖帽数需要输入"
  },
  hit_free_throw: {
    number: "需要输入数字",
    required: "罚球命中数需要输入"
  },
  hit_three_point: {
    number: "需要输入数字",
    required: "三分命中数需要输入"
  },
  hit_two_point: {
    number: "需要输入数字",
    required: "二分命中数需要输入"
  },
  rebound: {
    number: "需要输入数字",
    required: "篮板数需要输入"
  },
  steal: {
    number: "需要输入数字",
    required: "犯规数需要输入"
  },
  total_free_throw: {
    number: "需要输入数字",
    required: "罚球出手数需要输入"
  },
  total_three_point: {
    number: "需要输入数字",
    required: "三分出手数需要输入"
  },
  total_two_point: {
    number: "需要输入数字",
    required: "二分出手数需要输入"
  },
  diff: {
    min: "请检查命中数是否大于了出手数"
  }
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

export const newsFormRules = {
  files_count: {
    min: 1
  },
  title: {
    required: true
  },
  content: {
    required: true
  },
  start_time: {
    required: true
  },
  region: {
    required: true,
  },

}

export const newsFormMessages = {
  files_count: {
    min: '需要上传必要图片'
  },
  title: {
    required: '标题不能为空'
  },
  content: {
    required: '描述不能为空'
  },
  start_time: {
    required: '日期不能为空'
  },
  region: {
    required: '地区不能为空',
  },

}

//创建球队
export const teamFormRules = {
  name: {
    required: true
  },
  desc: {
    required: true
  },
  region: {
    required: true
  },
  address: {
    required: true
  },
  imgCount: {
    min: 1
  },
  number: {
    min: 8
  },

}

export const teamFormMessages = {
  name: {
    required: '球队名称不能为空'
  },
  desc: {
    required: '球队简介不能为空'
  },
  region: {
    required: '填写所在区域'
  },
  address: {
    required: '填写活动位置'
  },
  imgCount: {
    min: '需要上传队徽'
  },
  number: {
    min: '球队人数不能少于8人'
  },

}


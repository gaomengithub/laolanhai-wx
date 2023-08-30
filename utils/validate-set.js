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
    min: 1
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
  },
  ageDiff: {
    min: 1
  }
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
    min: '开始时间要大于结束时间'
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
  },
  ageDiff: {
    min: '年龄上限要大于年龄下限'
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
  }
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
  }
}


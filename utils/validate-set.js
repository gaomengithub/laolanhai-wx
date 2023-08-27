// 创建比赛
export const addMatchRules = {
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
}
export const addMatchMessages = {
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
  }
}
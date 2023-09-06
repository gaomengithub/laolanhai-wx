export function formatDate(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  // const hour = date.getHours()
  // const minute = date.getMinutes()
  // const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('-')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

export function formatForMatchCard(str) {
  const lstr = str.replace(/-/g, "T").replace(":00+08:00", "").split("T")
  const month = lstr[1]
  const day = lstr[2].replace(/^-0/, '')
  const time = lstr[3]
  return month + '月' + day + '日' + "  " + time
}

export function splitDateTime(str) {
  const lstr = str.replace(":00+08:00", "").split("T")
  return lstr
}


export function getDifferenceInMinute(time1, time2) {
  var t1 = time1.split(":");
  var t2 = time2.split(":");
  var minute1 = parseInt(t1[0]) * 60 + parseInt(t1[1]);
  var minute2 = parseInt(t2[0]) * 60 + parseInt(t2[1]);
  var diff = minute1 - minute2;
  return diff;
}


export function revertQiniuKey(str) {
  try {
    const key = str.replace("https://store.obabyball.com/","").split("?e=")[0]
    return key
  } catch {
    return str
  }

}
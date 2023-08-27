export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
let regExpTime = new RegExp("[0-9]{2}:[0-9]{2}", "g");
let regExpDate = new RegExp("-[0-9]{2}-[0-9]{2}", "g");
export function formatForMatchCard(str) {
  let matchTime = str.match(regExpTime);
  let matchDate = str.match(regExpDate);
  return matchTime[0] + '  ' + matchDate[0].replace("-","月").replace(/^-0/, '')
}


export function getDifferenceInMinute(time1, time2) {
  var t1 = time1.split(":");
  var t2 = time2.split(":");
  var minute1 = parseInt(t1[0]) * 60 + parseInt(t1[1]);
  var minute2 = parseInt(t2[0]) * 60 + parseInt(t2[1]);
  var diff = minute1 - minute2;
  return diff;
}

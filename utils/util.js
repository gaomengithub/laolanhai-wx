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
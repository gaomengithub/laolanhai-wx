export function formatDate(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${[year, month, day].map(formatNumber).join('-')}`
}

export function yearMonth(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  return `${[year, month].map(formatNumber).join('-')}`
}

export function formatTime(date) {
  const hours = date.getHours().toString()
  const minutes = date.getMinutes().toString()
  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`
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


export function getDiffInMinute(end, start) {
  const t1 = end.split(":");
  const t2 = start.split(":");
  const minute1 = parseInt(t1[0]) * 60 + parseInt(t1[1]);
  const minute2 = parseInt(t2[0]) * 60 + parseInt(t2[1]);
  return minute1 - minute2;
}



import { pinyin } from '../miniprogram_npm/pinyin-pro/index';
export function getInitial(nickname) {
  let initial = '';

  try {
    initial = pinyin(nickname)[0].toUpperCase()
  } catch (e) {
    initial = "$"
  }
  return initial;
}

function isChinese(str) {
  const reg = /^[\u4E00-\u9FA5]{1,}$/;
  return reg.test(str);
}

function isNumber(str) {
  const reg = /^[0-9]{1,}$/;
  return reg.test(str);
}

function isLetter(str) {
  const reg = /^[A-Za-z]{1,}$/;
  return reg.test(str);
}

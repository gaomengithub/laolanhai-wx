var log = require('$/utils/log.js')

export function handleErr(err, callback) {
  wx.showModal({
    title: '错误',
    content: err,
    showCancel: false,
    complete: (res) => {
      if (res.confirm && typeof callback === 'function') {
        callback()
      }
    }
  })
}

export function handleInfo(info, callback) {
  wx.showModal({
    title: '提示',
    content: info,
    showCancel: false,
    complete: (res) => {
      if (res.confirm && typeof callback === 'function') {
        callback()
      }
    }
  })
}


export function handleErrWithLog(err, callback) {
  wx.showModal({
    title: '错误',
    content: err.content,
    showCancel: false,
    complete: (res) => {
      if (res.confirm && typeof callback === 'function') {
        callback()
      }
    }
  })
  log.error(err.msg)
}
var raf = require('rafl')

module.exports = ease

function ease (from, to, opts, cb) {
  if (typeof opts == 'function') cb = opts, opts = {}
  if (typeof cb != 'function') return

  opts = opts || {}
  var eased = opts.ease || linear
  var duration = opts.duration || 350
  var start = +new Date
  var cancelled = false
  var value = from

  raf(animate)

  return function () {
    cancelled = true
  }

  function animate (timestamp) {
    if (cancelled) return cb(value, true)
    var time = Math.min(1, (+new Date - start) / duration)
    cb(value = (eased(time) * (to - from)) + from, time >= 1)
    if (time < 1) raf(animate)
  }
}

function linear (n) {
  return n
}

/*
 * @Author: roadloser
 * @Date: 2020-12-05 16:31:53
 * @LastEditors: roadloser
 * @LastEditTime: 2020-12-07 00:30:16
 */

/** 点击防抖 */
export function debounceForClick ({cb, waitFn, delay}: {
  cb: Function
  waitFn?: Function
  delay: number
}) {
  let debounceTimer: NodeJS.Timeout | number
  let debounceStatus = true
  return function (...rest) {
   clearTimeout(debounceTimer as NodeJS.Timeout)
   if (debounceStatus) {
    cb.apply(this, rest)
    debounceStatus = false
   }
   else {
    waitFn && waitFn.apply(this, rest)
   }
   debounceTimer = setTimeout(() => {
    debounceStatus = true
   }, delay)
  }
}

export function debounceFn (fn, time) {
  return debounceForClick({
    cb: fn,
    delay: time
  })
}

/** input防抖 */
export function debounceForInput ({cb, waitFn, delay}: {
  cb: Function
  waitFn?: Function
  delay: number
}) {
  let debounceTimer: NodeJS.Timeout | number
  let debounceStatus = true
  let context = null

  return (...rest) => {
    context = this
    function timeoutFn () {
      return setTimeout(() => { 
        debounceStatus = true
        cb.apply(this, rest)
      }, delay)
    }
    
    debounceTimer && clearTimeout(debounceTimer as NodeJS.Timeout)
    if (debounceStatus) {
      debounceTimer = timeoutFn.apply(context)
      debounceStatus = false
    }
    else {
      waitFn && waitFn.apply(context, rest)
      debounceTimer = timeoutFn.apply(context)
    }
  }
}

export default function debounce (fn, time) {
  return debounceForInput({
    cb: fn,
    delay: time
  })
}
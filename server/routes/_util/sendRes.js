/*
 * @Descripttion: res封装
 * @Author: roadloser
 * @Date: 2021-01-25 20:32:19
 * @LastEditors: roadloser
 * @LastEditTime: 2021-01-26 18:56:20
 */
const sendRes = (res, code = 200) => {
  let resObj = { code, msg: '' }
  if (typeof res === 'object' && 'data' in res) {
    resObj = { ...res }
  } else {
    if (res && res.code) resObj.code = res.code
    resObj.data = res
  }
  if (resObj.code === 200) {
    resObj.msg = 'ok'
  }
  if (resObj.code >= 400) {
    if (resObj.code < 500) {
      resObj.msg = '请求出错'
    } else if (resObj.code < 600) {
      resObj.msg = '服务出小差啦'
    } else if (resObj.code === 600) {
      resObj.msg = '网络开小差了'
    }
  }
  if (typeof res === 'string') {
    resObj.msg = res
  }
  console.log('resObj', resObj)
  return resObj
}

module.exports = sendRes
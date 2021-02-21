/*
 * @Descripttion: res封装
 * @Author: roadloser
 * @Date: 2021-01-25 20:32:19
 * @LastEditors: roadloser
 * @LastEditTime: 2021-02-19 21:27:54
 */
const sendRes = (res, code = 200) => {
  let resObj = { code, msg: '' }
  if (typeof res === 'object') {
    resObj.msg = res.msg || ''
    resObj.code = res.code || code
    if ('data' in res) {
      resObj = { ...res }
    }
    // sql err
    else if ('original' in res) {
      const { sqlMessage, errno } = res.original
      resObj.data = { ...res }
      resObj.msg = sqlMessage
      resObj.code = errno
    }
    else {
      resObj.data = res
    }
  } else if (typeof res === 'string') {
    resObj.msg = res
  } else {
    if (res && res.code) resObj.code = res.code
    resObj.data = res
  }

  if (!resObj.msg && resObj.code === 200) {
    resObj.msg = 'ok'
  }
  if (!resObj.msg && resObj.code >= 400) {
    if (resObj.code < 500) {
      resObj.msg = '请求出错'
    } else if (resObj.code < 600) {
      resObj.msg = '服务出小差啦'
    } else if (resObj.code === 600) {
      resObj.msg = '网络开小差了'
    }
  }
  return resObj
}

module.exports = sendRes
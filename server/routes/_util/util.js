/*
 * @Author: roadloser
 * @Date: 2021-01-26 18:02:52
 * @LastEditors: roadloser
 * @LastEditTime: 2021-02-17 03:06:38
 */
const isNullObj = obj => typeof obj === 'object' && JSON.stringify(obj) === '{}'

/**
 * @description: 判断参数字段是否有值
 * @param {*} enptyParams
 * @return {*}
 */
const enptyParams = params => {
  for (const key in params) {
    if (!params[key]) return key
  }
  return ''
}
module.exports = {
  isNullObj,
  enptyParams
}

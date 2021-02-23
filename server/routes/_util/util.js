/*
 * @Author: roadloser
 * @Date: 2021-01-26 18:02:52
 * @LastEditors: roadloser
 * @LastEditTime: 2021-02-23 22:40:18
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
const packageSqlPage = (opt) => {
  const page = Number(opt.page)
  const limit = Number(opt.limit)
  return {
    limit,
    offset: (page - 1) * limit,
    order: opt.order || [ ['createdAt', 'DESC'] ]  // 排序
  }
}
const exclude = ['createdAt', 'updatedAt', 'version']
module.exports = {
  isNullObj,
  packageSqlPage,
  exclude,
  enptyParams
}

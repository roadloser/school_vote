/*
 * @Author: roadloser
 * @Date: 2021-01-26 18:02:52
 * @LastEditors: roadloser
 * @LastEditTime: 2021-01-26 18:57:43
 */
exports.isNullObj = obj => typeof obj === 'object' && JSON.stringify(obj) === '{}'
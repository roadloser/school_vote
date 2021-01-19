/*
 * @Author: roadloser
 * @Date: 2021-01-25 10:47:24
 * @LastEditors: roadloser
 * @LastEditTime: 2021-01-25 13:28:07
 */
const jwt = require('jsonwebtoken')
const koa_jwt = require("koa-jwt")
const key = '路痴的schoolvote'  // 或者密钥

const setToken = opt => {
  global.token = jwt.sign(opt, key, {expiresIn: "1h"})
  return global.token
}
const needToken =  koa_jwt({ secret: key })
const getToken = token => jwt.verify(token, key)

module.exports = {
  setToken,
  needToken,
  getToken
}
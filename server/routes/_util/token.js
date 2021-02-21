/*
 * @Author: roadloser
 * @Date: 2021-01-25 10:47:24
 * @LastEditors: roadloser
 * @LastEditTime: 2021-02-19 22:15:17
 */
const jwt = require('jsonwebtoken')
const koa_jwt = require("koa-jwt")  // 不会用，所以没用它
const key = '路痴的schoolvote'  // 或者密钥

/**
 * @description: setToken
 * @param {*} opt: Object
 * @return { String }
 */
const setToken = opt => jwt.sign(opt, key, {expiresIn: "1h"})
const needToken =  koa_jwt({ secret: key })
const getToken = token => jwt.verify(token.replace('Bearer ', ''), key)

module.exports = {
  setToken,
  needToken,
  getToken
}
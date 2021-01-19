/*
 * @Author: roadloser
 * @Date: 2021-01-20 10:27:10
 * @LastEditors: roadloser
 * @LastEditTime: 2021-01-26 10:01:59
 */
const router = require('koa-router')()
const { User, Platform, Test } = require('../model')
const findUser = require('./_util/findUser')
const sendRes = require('./_util/sendRes')
router.prefix('/user')
// 获取用户信息
router.get('/', async ctx => {
  const { ids } = ctx.query
  // const  = await findUser() || [{}]
  ctx.body = {}
  // await findUser
})
module.exports = router
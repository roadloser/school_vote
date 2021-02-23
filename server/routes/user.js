/*
 * @Author: roadloser
 * @Date: 2021-01-20 10:27:10
 * @LastEditors: roadloser
 * @LastEditTime: 2021-02-23 12:51:39
 */
const router = require('koa-router')()
const { User, Platform, Test } = require('../model')
const findUser = require('./_util/findUser')
const sendRes = require('./_util/sendRes')
const httpStatus = require('./_util/httpStatus')
const { enptyParams } = require('./_util/util')
router.prefix('/user')
// 获取用户信息
router.get('/', async ctx => {
  const { ids } = ctx.query
  // const  = await findUser() || [{}]
  ctx.body = {}
  // await findUser
})

// 创建用户信息
router.post('/create', async (ctx, next) => {
  const params = ctx.request.body
  const { type } = await findUser(params, true)
  if (type !== 2) {
    ctx.body = sendRes('已存在用户名', httpStatus.common_exist)
    return await next()
  }

  // 录入
  const { user_id } = params
  const newParams = {
    user_id: params.user_id,
    name: params.name,
    pwd: params.pwd,
    gender: params.gender,
    user_info: params.user_info || {}
  }
  const enptyInfo = enptyParams(newParams)  // 字段名
  // 检查空值
  if (Boolean(enptyInfo)) {
    ctx.body = sendRes(`未传${enptyInfo}`, httpStatus.null_exist)
    return await next()
  }
  try {
    // 先在平台表建user
    const { id: ids } = await Platform.create({ user_id })
    // 取平台表id，建user
    const newUser = await User.create({ ...newParams, ids })
    console.log('newUser', newUser);
    ctx.body = sendRes(newUser)
  } catch (e) {
    ctx.body = sendRes(e)
  }
})

module.exports = router
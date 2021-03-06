/*
 * @Descripttion: 
 * @version: 
 * @Author: roadloser
 * @Date: 2021-01-20 10:27:10
 * @LastEditors: roadloser
 * @LastEditTime: 2021-03-06 13:10:31
 */
const router = require('koa-router')()
const user = require('./user')
const test = require('./test')
const activity = require('./activity')
const permission = require('./permission')
const findUser = require('./_util/findUser')
const sendRes = require('./_util/sendRes')
const httpStatus = require('./_util/httpStatus')
const { setToken, getToken } = require('./_util/token')
const { User } = require('../model')

// login
router.get('/login', async (ctx, next) => {
  const params = ctx.query
  const { id: ids, user_id, type } = await findUser(params, true)
  if (type === 2) {
    ctx.body = sendRes('用户名不存在', httpStatus.common_no_exist)
    return await next()
  }

  // 验证密码
  const user = await User.findAll({
    where: { ids }
  })
  const { pwd } = user[0] || {}
  if (!pwd) {
    ctx.body = sendRes({
      msg: '密码为空，可能没找到user',
      data: user
    }, httpStatus.user_pwd_err)
    return await next()
  }
  if (pwd !== params.pwd) {
    ctx.body = sendRes('密码错误', httpStatus.user_pwd_err)
    return await next()
  }
  // 设置token
  const token = setToken({ token_id: ids, user_id })
  ctx.body = sendRes({
    token,
    id: ids,
    user_info: {
      ...user[0].user_info,
      name: user[0].username,
      gender: user[0].gender
    },
    msg: '登录成功'
  })
})

router.use(user.routes(), user.allowedMethods())
router.use(test.routes(), test.allowedMethods())
router.use(activity.routes(), activity.allowedMethods())
router.use(permission.routes(), permission.allowedMethods())

module.exports = router

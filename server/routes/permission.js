/*
 * @Author: roadloser
 * @Description: 
 * @Date: 2021-02-19 21:56:55
 * @LastEditors: roadloser
 * @LastEditTime: 2021-02-20 22:38:29
 */
const router = require('koa-router')()
const { Permission } = require('../model')
const findUser = require('./_util/findUser')
const httpStatus = require('./_util/httpStatus')
const sendRes = require('./_util/sendRes')
const { enptyParams } = require('./_util/util')
router.prefix('/permission')

router.post('/create', async(ctx, next) => {
  const { authorization } = ctx.header
  const { level = 1 } = ctx.request.body
  const { id, type } = await findUser(authorization)
  if (type === 3) {
    ctx.body = sendRes('token已过期', httpStatus.token_err)
    return await next()
  }
  const [perRes, created] = await Permission.findOrCreate({
    where: { permission_id: id },
    defaults: { level }
  });
  ctx.body = sendRes(created ? '已设置' : '已存在权限')
})

module.exports = router
/*
 * @Author: roadloser
 * @Date: 2021-02-19 11:16:49
 * @LastEditors: roadloser
 * @LastEditTime: 2021-02-22 00:14:21
 */
const router = require('koa-router')()
const { Activity, Permission, Participant } = require('../model')
const findUser = require('./_util/findUser')
const httpStatus = require('./_util/httpStatus')
const sendRes = require('./_util/sendRes')
const { enptyParams } = require('./_util/util')
router.prefix('/activity')

/**
 * @description: 活动列表
 */
router.get('List', async(ctx) => {
  const { limit, page, act_query } = ctx.query
  const res = await Activity.findAll({
    order: [ ['createdAt', 'DESC'] ],  // 排序
    limit: Number(limit),
    offset: (page - 1) * limit,
    where: {
      allowShow: true
    }
  })

  const { authorization } = ctx.header
  const { id, type } = await findUser(authorization)

  ctx.body = sendRes(res)
})

/**
 * @description: 活动页
 */
router.get('/', async(ctx, next) => {
  // 根据活动id【查询】【活动表】
  // 获取候选人名单与投票表 participant
  // 确定报名状态 signup_status
})


/**
 * @description: 创建活动
 */
router.post('/create', async(ctx, next) => {
  const { authorization } = ctx.header
  const { id, type } = await findUser(authorization)
  if (type === 3) {
    ctx.body = sendRes('token已过期', httpStatus.toekn_err)
    return await next()
  }

  // 检查权限
  const { level = 0 } = await Permission.findOne({
    where:{ permission_id: id }
  })
  if (!level) {
    ctx.body = sendRes('用户无此权限', httpStatus.user_no_permission)
    return await next()
  }
  const now = Date.now()
  const date_default = 1000 * 60 * 24 + now
  const {
    act_name,
    allowShow,
    act_end = date_default,
    sign_end = date_default,
    participants = [],
    act_extends = {}
  } = ctx.request.body
  if (act_end < sign_end) {
    ctx.body = sendRes('报名时间不能晚于活动截止时间', httpStatus.validation_failed)
    return await next()
  }
  if (now > act_end || now > sign_end) {
    console.log(date_default);
    ctx.body = sendRes('创建时间不能晚于结束时间', httpStatus.validation_failed)
    return await next()
  }
  const { id: act_id } = await Activity.create({
    create_user: id,
    act_name,
    allowShow,
    act_end,
    sign_end,
    act_extends
  })
  // 添加候选人
  participants.length && await Participant.bulkCreate(
    participants.map(pid => {
      return { act_id, user_id: pid }
    })
  )
  ctx.body = sendRes({act_id})
})

/**
 * @description: 活动报名页
 */
router.post('/signup', async(ctx, next) => {
  const { authorization } = ctx.header
  const { id, type } = await findUser(authorization)
  if (type === 3) {
    ctx.body = sendRes('token已过期，请重新登录', httpStatus.toekn_err)
    return await next()
  }
  const { act_id, signup_extends } = ctx.request.body
  const [res, create] = await Participant.findOrCreate({
    where: { act_id, player_id: id },
    defaults: { signup_extends, signup_status: 1, signup_type: 0}
  })
  ctx.body = sendRes(create ? '报名成功' : '不能重复报名')
})


/**
 * @description: 获取报名信息
 */
router.get('/signup', async(ctx, next) =>{
  // 需要活动id
})


/**
 * @description: 投票
 */
router.get('/vote', async(ctx, next) =>{
  // 需要活动id
})

module.exports = router
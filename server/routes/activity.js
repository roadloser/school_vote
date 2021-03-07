/*
 * @Author: roadloser
 * @Date: 2021-02-19 11:16:49
 * @LastEditors: roadloser
 * @LastEditTime: 2021-03-07 17:35:33
 */
const router = require('koa-router')()
const {
  sequelize,
  Op
} = require('../db')
const {
  Activity,
  User,
  Permission,
  Participant,
  Vote
} = require('../model')
const findUser = require('./_util/findUser')
const httpStatus = require('./_util/httpStatus')
const sendRes = require('./_util/sendRes')
const {
  enptyParams,
  packageSqlPage,
  isNullObj,
  exclude
} = require('./_util/util')
router.prefix('/activity')

// 获取活动信息
const getActivity = async (act_id, needCreatedTime = false) => {
  const actRes = await Activity.findOne({
    where: {
      id: act_id
    },
    attributes: {
      exclude: needCreatedTime ? exclude.filter((e, i) => i > 0) : exclude
    }
  })
  return actRes ? actRes.dataValues : {}
}

// 获取user信息
const getUser = async (ids, attributes = [['username', 'name'], 'gender', 'user_info']) => {
  const userRes = await User.findOne({
    where: { ids },
    attributes
  })
  return userRes ? userRes.dataValues : {}
}
/**
 * @description: 活动列表
 */
router.get('List', async (ctx) => {
  const {
    limit,
    page,
    act_query
  } = ctx.query
  // 获取列表
  const res = await Activity.findAll({
    ...packageSqlPage({
      page,
      limit
    }),
    attributes: {
      exclude
    },
    where: {
      allowShow: true,
      act_name: {
        [Op.like]: `%${ act_query }%`
      }
    }
  })
  ctx.body = sendRes(res)
})

/**
 * @description: 活动页
 */
router.get('/', async (ctx, next) => {
  const {
    page,
    limit,
    act_id
  } = ctx.query
  // 查询候选人
  const parList = await Participant.findAll({
    ...packageSqlPage({
      page,
      limit
    }),
    where: {
      act_id,
      signup_status: 1
    },
    attributes: ['player_id', 'signup_type', 'signup_extends']
  })
  // 聚合候选人的票数
  let participants = []
  for (let i = 0; i < parList.length; i++) {
    const par = (parList[i] && parList[i].dataValues) || {};
    const user = await getUser(par.player_id)
    const [pollObj] = await Vote.findAll({
      where: {
        player_id: par.player_id,
        act_id
      },
      attributes: [[sequelize.fn('SUM', sequelize.col('count')), 'poll']]
    })
    const poll = (pollObj.dataValues && pollObj.dataValues.poll) || 0
    console.log('poll\n\n\n', poll, pollObj);
    participants.push({
      ...user,
      ...par,
      poll
    })
  }
  console.log('participants\n', participants);
  // 获取活动信息
  const actRes = await getActivity(act_id, 1)
  if (isNullObj(actRes)) {
    ctx.body = sendRes('活动不存在', httpStatus.common_no_exist)
    return await next()
  }
  // 确定报名状态 前端处理
  ctx.body = sendRes({
    ...actRes,
    participants
  })
})


/**
 * @description: 创建活动
 */
router.post('/create', async (ctx, next) => {
  const {
    authorization
  } = ctx.header
  console.log('ctx.request.body\n\n\n\n', ctx.request.body);
  const {
    id,
    type
  } = await findUser(authorization)
  if (type === 3) {
    ctx.body = sendRes('token已过期', httpStatus.token_err)
    return await next()
  }
  // 检查权限
  const {
    level = 0
  } = await Permission.findOne({
    where: {
      permission_id: id
    }
  }) || {}
  if (!level) {
    ctx.body = sendRes('用户无此权限', httpStatus.user_no_permission)
    return await next()
  }
  const now = Date.now()
  const date_default = 1000 * 60 * 60 * 24 + now
  const {
    act_name,
    act_info,
    allowShow,
    act_end = date_default,
    sign_end = date_default,
    participants = [],
    act_extends = {
      vote_limit: 0,
      limit_times: 0,
      vote_myself: true
    }
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
  // 添加活动
  const {
    id: act_id
  } = await Activity.create({
    create_user: id,
    act_name,
    act_info,
    allowShow,
    act_end,
    sign_end,
    act_extends
  })
  // 添加候选人
  participants.length && await Participant.bulkCreate(
    participants.map(pid => {
      return {
        act_id,
        user_id: pid
      }
    })
  )
  ctx.body = sendRes({
    act_id
  })
})

/**
 * @description: 活动报名页
 */
router.post('/signup', async (ctx, next) => {
  const {
    authorization
  } = ctx.header
  const {
    id,
    type
  } = await findUser(authorization)
  if (type === 3) {
    ctx.body = sendRes('token已过期，请重新登录', httpStatus.token_err)
    return await next()
  }
  const {
    act_id,
    signup_extends
  } = ctx.request.body
  // 检查活动条件
  const {
    id: actId,
    sign_end
  } = await getActivity(act_id)
  if (!actId) {
    ctx.body = sendRes('活动不存在', httpStatus.common_no_exist)
    return await next()
  }
  if (sign_end < Date.now()) {
    ctx.body = sendRes('已过报名时间', httpStatus.validation_failed)
    return await next()
  }
  const [res, create] = await Participant.findOrCreate({
    where: {
      act_id,
      player_id: id
    },
    defaults: {
      signup_extends,
      signup_status: 1,
      signup_type: 0
    }
  })
  ctx.body = sendRes(create ? '报名成功' : '不能重复报名')
})


/**
 * @description: 获取报名信息
 */
router.get('/signup', async (ctx, next) => {
  // 需要活动id
})


/**
 * @description: 投票
 * @条件 :投票条件...先少弄，能跑就行
 */
router.get('/vote', async (ctx, next) => {
  const {
    act_id,
    player_id
  } = ctx.query
  // 需要登录
  const {
    authorization
  } = ctx.header
  const {
    id: uid,
    type
  } = await findUser(authorization)
  if (type === 3) {
    ctx.body = sendRes('token已过期，请重新登录', httpStatus.token_err)
    return await next()
  }
  // 没传关键参数
  const errMsg = enptyParams({
    act_id,
    player_id
  })
  if (errMsg) {
    ctx.body = sendRes(`没传${errMsg}`, httpStatus.validation_failed)
    return await next()
  }
  // 投票条件
  const {
    act_end,
    act_extends,
    id: actId
  } = await getActivity(act_id)
  const {
    limit_times = 0
  } = act_extends || {}
  if (!actId) {
    ctx.body = sendRes('活动不存在', httpStatus.common_no_exist)
    return await next()
  }
  if (Date.now() > act_end) {
    ctx.body = sendRes('活动结束，无法投票', httpStatus.validation_failed)
    return await next()
  }
  // sql
  const [_voteRes, isFirst] = await Vote.findOrCreate({
    where: {
      act_id,
      player_id,
      user_id: uid
    },
    defaults: {count: 0}
  })
  const voteRes = _voteRes.dataValues || {}
  let count = voteRes.count || 0
  let msg = '投票成功'
  // 投票规则
  switch (limit_times) {
    case 0:
      count = Number(!count)
      msg = count ? msg : '取消成功'
      break;
    case 1: 
    default:
      const voted_times = await Vote.sum('count', {
        where: {
          act_id,
          user_id: uid
        }
      })
      if (limit_times < voted_times) {
        ctx.body = sendRes(`已达到该活动投票${limit_times}次限制`, httpStatus.validation_failed)
        return await next()
      }
      count++
  }
  await Vote.update({ count }, {
    where: { id: voteRes.id }
  })
  ctx.body = sendRes({
    msg,
    data: count
  })
})

module.exports = router

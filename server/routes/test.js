/*
 * @Author: roadloser
 * @Date: 2021-01-25 09:47:32
 * @LastEditors: roadloser
 * @LastEditTime: 2021-02-20 22:31:23
 */

const {
  setToken,
  getToken,
  needToken
} = require('./_util/token')
const { isNullObj } = require('./_util/util')
const router = require('koa-router')()
const findUser = require('./_util/findUser')
const sendRes = require('./_util/sendRes')
const { Platform } = require('../model')
router.prefix('/test')
// test.创建用户
router.get('/ccc', async ctx => {
  const res = await findUser()
  ctx.body = {
    global: global.token || '',
    ...res
  }
  // await findUser
})

router.get('/init', async(ctx) => {
  require('../db-init')
  ctx.body = sendRes('db-init')
})
router.post('/create', async (ctx, next) => {
  const { user_id = null, weapp_id = null, alipay_id = null } = ctx.request.body
  let ids = {}
  if (user_id) ids.user_id = user_id
  if (weapp_id) ids.weapp_id = weapp_id
  if (alipay_id) ids.alipay_id = alipay_id
  if (isNullObj(ids)) {
    ctx.body = sendRes({}, 401)
    return await next()
  }
  
  const findRes = await findUser(ids)
  const { type = 0, user_id: uid,  id = '' } = findRes
  try {
    switch (Number(type)) {
      case 0: 
        console.log('already had account');
        // break

      case 1:
        console.log('enter 1------\n\n\n\n\n\n\n', id)
        await Platform.update(ids, { where: { id } })
        ctx.body = sendRes()
        return await next()
        
      case 3:
      case 2: 
        console.log('enter 2------\n\n\n\n\n\n\n')
        // const obj = { id: generateId(), user_id, weapp_id, alipay_id }
        // const res2 = await sequelize.query(
        //   `insert into platform (${Object.keys(obj).join(',')}) values (?,?,?,?)`,
        //   {
        //     model: Platform,
        //     mapToModel: true,
        //     replacements: Object.values(obj),
        //     type: QueryTypes.INSERT
        //   }
        // )
        const res2 = await Platform.create(ids)
        ctx.body = sendRes(res2)
        break

      // case 3:
      //   console.log('need token');
      //   ctx.body = sendRes('need token', 401)
      //   break
        
      case 4:
        console.log('sql err');
        ctx.body = sendRes('sql err', 500)
        break
    }
  } catch (error) {
    console.log('error', error);
    ctx.body = { error }
  }
})

// router.get('/', async ctx => {
//   const { user_id = null, weapp_id = null, alipay_id = null } = ctx.request.body
//   let ids = {}
//   if (user_id) ids.user_id = user_id
//   if (weapp_id) ids.weapp_id = weapp_id
//   if (alipay_id) ids.alipay_id = alipay_id
//   if (isNullObj(ids)) {
//     ctx.body = sendRes({}, 401)
//     return await next()
//   }
//   await Platform.findOrCreate({
//     where: {: '小明'}, 
//     defaults: {age: 5}
//   })
//   .spread((user, created) => {
//     if(created === false) {
//       user.update(ids)
//     }
//   })
// })

router.post('/setToken', async (ctx, next) => {
  const { user_id, weapp_id, alipay_id } = ctx.query
  const token = await setToken({ user_id, weapp_id, alipay_id })
  ctx.body = { token }
})

// 只有authorization才会try，null直接报错，走另外的逻辑
router.get('/getToken', needToken, async (ctx, next) => {
  const { authorization } = ctx.header
  try {
    const res = await getToken(authorization)
    ctx.body = res
  } catch (error) {
    console.log('res', error);
    ctx.body = error  // code 401
  }
})

router.get('/token', async (ctx, next) => {
  const { authorization } = ctx.header
  try {
    const res = await getToken(authorization)
    ctx.body = res
  } catch (error) {
    console.log('res', error);
    ctx.body = error  // code 401
  }
})

router.get('/actTest', async(ctx, next) => {
  // const param = ctx.request.body
  const param = ctx.query
  console.log(param);
})
module.exports = router
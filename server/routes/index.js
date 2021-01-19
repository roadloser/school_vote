/*
 * @Descripttion: 
 * @version: 
 * @Author: roadloser
 * @Date: 2021-01-20 10:27:10
 * @LastEditors: roadloser
 * @LastEditTime: 2021-01-25 12:10:25
 */
const router = require('koa-router')()
const user = require('./user')
const test = require('./test')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.use(user.routes(), user.allowedMethods())
router.use(test.routes(), test.allowedMethods())

module.exports = router

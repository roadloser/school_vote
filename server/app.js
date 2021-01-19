/*
 * @Author: roadloser
 * @Date: 2021-01-20 10:27:10
 * @LastEditors: roadloser
 * @LastEditTime: 2021-01-26 18:58:48
 */
const Koa = require('koa')
const app = new Koa()
const cors = require('koa2-cors');
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')

// cors
app.use(cors({
  origin: function (ctx) {
    if (ctx.url === '/test') {
      console.log('请求了啊')
      return "*"; // 允许来自所有域名请求
    }
    return 'http://localhost:3000'; // 这样就能只允许 http://localhost:3000 这个域名的请求了
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} ~~~~~ ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
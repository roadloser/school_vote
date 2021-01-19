/*
 * @Descripttion: 活动表
 * @Author: roadloser
 * @Date: 2021-01-21 21:15:21
 * @LastEditors: roadloser
 * @LastEditTime: 2021-01-23 16:48:29
 */
const db = require('../db')
const allowNull = true

module.exports = db.defineModel('activity', {
  act_id: db.ID,  // 活动id
  act_name: db.STRING(100),  // 活动名称
  hasShow: db.BOOLEAN,  // 是否展示
  act_create: db.BIGINT,  // 活动创建时间
  act_end: db.BIGINT,  // 活动结束时间
  sign_end: db.BIGINT,  // 报名结束时间

  // 扩展
  // 投票限制  <=0: all || 指定id[]
  vote_limit: {
    type: db.ID,  // 以后再分离
    // type: db.ARRAY(db.STRING),  // 以后再分离
    allowNull
  },
  // 限投次数>=0  0:不限
  limit_times: {
    type: db.INTEGER,
    allowNull
  }
})
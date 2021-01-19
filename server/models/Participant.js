/*
 * @Descripttion: 候选人表
 * @Author: roadloser
 * @Date: 2021-01-21 21:28:40
 * @LastEditors: roadloser
 * @LastEditTime: 2021-01-23 16:48:54
 */
const db = require('../db')

module.exports = db.defineModel('participant', {
  act_id: db.ID,  // 活动id
  user_id: db.ID,  // 用户id
  sign_time: db.TIME,  // 报名时间
  sign_status: db.INTEGER,  // 报名状态  0: 弃权， 1:  ok
  sign_type: db.INTEGER,  // 报名方式  0: 自主， 1:  内推

  // 扩展，也懒得建表
  info: db.JSON  // 信息
})
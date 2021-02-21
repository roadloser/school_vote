/*
 * @Descripttion: 候选人表
 * @Author: roadloser
 * @Date: 2021-01-21 21:28:40
 * @LastEditors: roadloser
 * @LastEditTime: 2021-02-21 23:04:55
 */
const db = require('../db')

module.exports = db.defineModel('participant', {
  act_id: db.ID,  // 活动id
  player_id: db.ID,  // 选手id
  // sign_time: db.TIME,  // 报名时间
  signup_status: db.INTEGER,  // 报名状态  0: 没报名， 1:  ok  2： 弃权
  signup_type: db.INTEGER,  // 报名方式  0: 自主， 1:  内推

  // 扩展，也懒得建表
  signup_extends: db.JSON
  // signup_info： db.STRING  // 信息
  // signup_pic: 图片数组
})
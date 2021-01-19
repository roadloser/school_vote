/*
 * @Descripttion: 报名表
 * @Author: roadloser
 * @Date: 2021-01-22 10:15:36
 * @LastEditors: roadloser
 * @LastEditTime: 2021-01-23 16:50:09
 */

const db = require("../db");

module.exports = db.defineModel('vote', {
  act_id: db.ID,  // 活动id
  user_id: db.ID,  // 用户id
  participant_id: db.ID,  // 候选人id
  count: db.INTEGER  // 投票总数
});
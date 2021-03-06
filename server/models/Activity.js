/*
 * @Descripttion: 活动表
 * @Author: roadloser
 * @Date: 2021-01-21 21:15:21
 * @LastEditors: roadloser
 * @LastEditTime: 2021-03-06 02:26:41
 */
const db = require('../db')
const allowNull = true

module.exports = db.defineModel('activity', {
  create_user: db.ID,  // 创建者
  act_name: db.STRING(100),  // 活动名称
  act_info: db.STRING(100),  // 活动简介
  allowShow: db.BOOLEAN,  // 是否展示
  // act_create: db.BIGINT,  // 活动创建时间
  act_end: db.BIGINT,  // 活动结束时间
  sign_end: db.BIGINT,  // 报名结束时间
  // participants: db.STRING,  // 候选人 以','隔开 直接弄表算了
  // 扩展
  act_extends: { type: db.JSON, allowNull },

  // 投票限制  <=0: all || 指定id[]
  // vote_limit: {
  //   type: db.ID,  // 以后再分离
  //   // type: db.ARRAY(db.STRING),  // 以后再分离
  //   allowNull
  // },

  // 限投次数>=0  0:不限
  // limit_times: {
  //   type: db.INTEGER,
  //   allowNull
  // }

  // 是否能投自己
  // vote_myself: db.BOOLEAN
})
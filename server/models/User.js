/*
 * @Descripttion: 用户表
 * @Author: roadloser
 * @Date: 2021-01-22 10:48:57
 * @LastEditors: roadloser
 * @LastEditTime: 2021-01-22 11:49:51
 */
const db = require('../db');

module.exports = db.defineModel('user', {
  ids: db.ID,  // user_id
  name: db.STRING(100),
  pwd: db.STRING(100),
  gender: db.BOOLEAN,  // 性别

  user_info: db.JSON  // { imageUrl, ... }

});
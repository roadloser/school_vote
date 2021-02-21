/*
 * @Descripttion: 用户表
 * @Author: roadloser
 * @Date: 2021-01-22 10:48:57
 * @LastEditors: roadloser
 * @LastEditTime: 2021-02-17 03:05:44
 */
const db = require('../db');

module.exports = db.defineModel('user', {
  ids: db.ID,  // 平台表id
  name: db.STRING(100),
  pwd: db.STRING(100),
  gender: db.BOOLEAN,  // 性别

  user_info: db.JSON  // { imageUrl, ... }

});
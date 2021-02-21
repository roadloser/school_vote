/*
 * @Author: roadloser
 * @Description: 权限表
 * @Date: 2021-02-19 21:46:27
 * @LastEditors: roadloser
 * @LastEditTime: 2021-02-19 21:55:37
 */
const db = require('../db');
module.exports = db.defineModel('permission', {
  permission_id: db.ID,  // 有权限的id
  level: db.INTEGER(10)  // 权限等级
});
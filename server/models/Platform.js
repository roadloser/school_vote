/*
 * @Descripttion: 平台表
 * @Author: roadloser
 * @Date: 2021-01-22 11:49:06
 * @LastEditors: roadloser
 * @LastEditTime: 2021-01-26 18:38:55
 */
const db = require('../db');

const platformType = {
  type: db.ID,
  allowNull: true
}
module.exports = db.defineModel('platform', {
  user_id: { ...platformType },
  weapp_id: { ...platformType },
  alipay_id: { ...platformType }
});
/*
 * @Descripttion: 
 * @version: 
 * @Author: roadloser
 * @Date: 2021-01-22 14:40:38
 * @LastEditors: roadloser
 * @LastEditTime: 2021-02-19 21:16:50
 */
const model = require('./model');

(async() => {
  await model.sync();
  console.log('已建立model');
  // process.exit(0)
})()
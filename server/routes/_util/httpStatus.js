/*
 * @Author: roadloser
 * @Description: 统一状态码
 * @Date: 2021-02-19 23:05:37
 * @LastEditors: roadloser
 * @LastEditTime: 2021-02-23 12:51:04
 */
const httpStatus = {
  // token
  token_err: 401000,  // token过期

  // common
  common_no_exist: 403001,  // xx不存在
  common_exist: 403002,  // xx已存在

  // user
  user_pwd_err: 403101,  // 密码有误
  user_no_permission: 403102,  // 用户无权限
  
  // 传参有误
  null_exist: 400100,  // 重要参数未传
  validation_failed: 400101,  // 所传参数验证失败
}

module.exports = httpStatus
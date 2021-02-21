/*
 * @Author: roadloser
 * @Description: 统一状态码
 * @Date: 2021-02-19 23:05:37
 * @LastEditors: roadloser
 * @LastEditTime: 2021-02-21 01:48:17
 */
const httpStatus = {
  // token
  toekn_err: 401000,  // token过期

  // user 系列 000~099
  user_no_exist: 403001,  // 该用户不存在
  user_exist: 403002,  // 该用户已存在
  user_pwd_err: 403003,  // 密码有误
  user_no_permission: 403004,  // 用户无权限

  // 传参有误
  null_exist: 400100,  // 重要参数未传
  validation_failed: 400101,  // 所传参数验证失败
}

module.exports = httpStatus
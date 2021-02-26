/*
 * @Author: roadloser
 * @Description: 登录
 * @Date: 2021-02-26 01:58:55
 * @LastEditors: roadloser
 * @LastEditTime: 2021-02-26 18:43:48
 */
import { ajaxGet } from './../util/_http';
interface ILoginAPI {
  user_id?: string
  alipay_id?: string
  weapp_id?: string
  pwd?: string
}
export const loginAPI = (params: ILoginAPI) => {
  return ajaxGet('/api/login', params)
}
/*
 * @Author: roadloser
 * @Date: 2020-12-19 17:49:21
 * @LastEditors: roadloser
 * @LastEditTime: 2021-02-27 00:18:01
 */
import { ajaxGet } from './../util/_http';
export interface ISearchResult {
  id: number | string  // 活动id
  act_name: string  // 活动名称
  allowShow: boolean  // 展示?
  act_end: number  // 活动截止时间
}
export const getSreachListAPI = (params) => {
  return ajaxGet('/api/activityList', params)
}
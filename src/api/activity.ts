import { ajaxGet } from './../util/_http';
/*
 * @Author: roadloser
 * @Date: 2020-12-19 22:49:29
 * @LastEditors: roadloser
 * @LastEditTime: 2021-02-27 01:34:09
 */
export interface IParticipant {
  name: string // 候选人姓名
  poll: number // 票数
  player_id: string  // 选手id
  signup_extends: {
    s_info: string  // 选手简介
  }
}
export interface IActivity {
  act_name: string  // 活动名称
  allowShow: boolean  // 是否展示
  act_end: number  // 活动结束时间
  sign_end: number  // 投票结束时间
  act_extends: {
    vote_limit: number  // 限制
    limit_times: number  // 限投次数
    vote_myself: boolean  // 是否可以投自己
  }
  id: string  // 活动id
  createdAt: number  // 创建时间
  participants: IParticipant[]  // 候选人们的信息
}

export const getActivityAPI = opt => {
  return ajaxGet('/api/activity', opt)
}

export const voteAPI = (opt) => {
  return ajaxGet('/api/activity/vote', opt)
}
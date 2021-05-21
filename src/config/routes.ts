/*
 * @Author: roadloser
 * @Date: 2020-12-19 21:34:49
 * @LastEditors: roadloser
 * @LastEditTime: 2021-05-21 13:35:28
 */

export const hostAddress = {
  host: 'http://localhost',
  port: '3000'
}

export const routes = {
  index: '/pages/index/index',  // 首页
  login: '/pages/login/index',  // 登录页
  my: '/pages/my/index',  // 我的
  myPublishedActivities: '/pages/my/_my/my_published_activities/index',  // 我已发布的活动
  activity: '/pages/activity/index',  // 活动item页
  activityCreate: '/pages/activity/create/index',  // 活动创建页
  voteDetails: '/pages/activity/vote_detail/index',  // 投票详情页
  entryForm: '/pages/activity/entry_form/index',  // 报名表
}
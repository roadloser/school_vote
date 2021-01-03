/*
 * @Descripttion: 语言
  以后上传到云，
  避免为了修改文案而重新打包
 * @Author: roadloser
 * @Date: 2020-12-31 14:26:21
 * @LastEditors: roadloser
 * @LastEditTime: 2021-01-03 21:05:54
 */

import { ILangObj } from "./_i"

// 以后在这里处理是什么语言，处理后进行操作
const langPackage: ILangObj = {
  common: {
    // tab栏、加载等
    bar_index: '首页',
    bar_my: '我的',
    loading: '加载中',
    logo: 'SchoolVote',
    
    // 网络状态
    404: '找不到网页'
  },
  index: {
    index_input_placeholder: '搜索活动id/活动名称',
    index_end_time: '结束时间',
    index_button_type_doing: '进行中',
    index_button_type_done: '已结束',
    index_cancel: '取消',
  },
  my: {
    input_placeholder: '搜索活动id/活动名称',
    end_time: '结束时间',
    button_type_doing: '进行中',
    button_type_done: '已结束',
  },
  activity: {
    // 活动页
    activity_name: '姓名',
    activity_poll: '票数',
    activity_sign_up: '报名',
    activity_vote: '投票',
    activity_vote_debounce: '过会再投',
  }
}
export default langPackage
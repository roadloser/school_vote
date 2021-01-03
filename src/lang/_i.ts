/*
 * @Descripttion: 
 * @version: 
 * @Author: roadloser
 * @Date: 2020-12-31 15:13:54
 * @LastEditors: roadloser
 * @LastEditTime: 2021-01-03 21:06:18
 */

export interface ILangObj {
  common: {
    // tab栏
    bar_index: string
    bar_my: string
    loading: string
    logo: string
    // 网络状态
    404: string
  }
  
  // 首页
  index: {
    index_input_placeholder: string
    index_end_time: string
    index_button_type_doing: string
    index_button_type_done: string
    index_cancel: string
  }
  
  // 我的
  my: {
    input_placeholder: string
    end_time: string
    button_type_doing: string
    button_type_done: string
  }
  
  // 活动页
  activity: {
    activity_name: string
    activity_poll: string
    activity_sign_up: string
    activity_vote: string
    activity_vote_debounce : string
  }
}
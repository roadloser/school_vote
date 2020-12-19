/*
 * @Author: roadloser
 * @Date: 2020-12-19 17:49:21
 * @LastEditors: roadloser
 * @LastEditTime: 2020-12-19 21:30:13
 */
export interface ISearchResult {
  act_id: number | string  // 活动id
  act_name: string  // 活动名称
  isShow: boolean  // 展示?
  vote_time: any  // 投票截止时间
}
export const getSreachListAPI = (value) => {
  return {
    data: {
      searchList: [{
        act_id: 1,
        act_name: '测试1',
        isShow: true,
        vote_time: Date.now() + 500000
      },{
        act_id: 2,
        act_name: '测试2',
        isShow: true,
        vote_time: Date.now()
      }]
    }
  }
}
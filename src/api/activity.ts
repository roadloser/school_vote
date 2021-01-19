/*
 * @Author: roadloser
 * @Date: 2020-12-19 22:49:29
 * @LastEditors: roadloser
 * @LastEditTime: 2021-01-12 22:05:41
 */
export interface IParticipant {
  participant_id: number  // 候选人id
  name: string  // 候选人姓名
  poll: number  // 票数
}
export interface IActivity {
  actList: IParticipant[]  // 候选人们的信息
  signType: number   // 0: 报名截止 1:报名 2: 编辑报名
  sign_id: number  // 活动报名id
}
export const getActivityAPI = opt => {
  return {
    code: 200,
    data: {
      actList: [{
        participant_id: 1,
        name: '测试1',
        poll: 12
      },{
        participant_id: 2,
        name: '测试2',
        poll: 12
      }],
      signType: 1,
      sign_id: 1
    }
  }
}

export const voteAPI = (id) => {
  return {
    code: id > 0 ? 200 : 400,
    data: {}
  }
}
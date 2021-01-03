/*
 * @Author: roadloser
 * @Date: 2020-12-19 22:49:29
 * @LastEditors: roadloser
 * @LastEditTime: 2020-12-31 15:58:48
 */
export interface IParticipant {
  participant_id: number | string,
  name: string,
  poll: number | string,
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
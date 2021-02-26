import React, { Component } from 'react'
import { getCurrentInstance } from '@tarojs/taro';
import { View, Text, ScrollView } from '@tarojs/components';
import { getActivityAPI, IParticipant } from '@/api/activity';
import { debounceFn } from '@/util/debounce';
import { CSSRemainHeight, navigate } from '@/util/system';
import { routes } from '@/config/routes';
import { getLang, clickVote } from './_util';
import transfer from '@/util/transfer';
import './index.less';
import { inject, observer } from 'mobx-react';

interface IState {
  activityList: IParticipant[],  // 候选人
  signType: number  // 0: 报名截止 1:报名 2: 编辑报名
}
interface IProps {}
@inject('user')
@observer
export default class Activity extends Component<IProps, IState> {
  activity_id: nstring  // 活动id
  sign_id: number  // 活动报名id
  page:number = 1
  limit = 10
  constructor(props) {
    super(props);
    this.state = {
      activityList: [],
      signType: 0
    }
  }

  componentDidMount() {
    const { aid = '' } = getCurrentInstance().router!.params
    this.activity_id = aid
    this.getActivity()
  }

  // 获取活动信息
  getActivity = async() => {
    const { page, limit } = this
    const { code, data } = await getActivityAPI({
      act_id: this.activity_id,
      page,
      limit
    }) || {}
    if(code === 200) {
      const { participants, signType, sign_id } = data
      sign_id && (this.sign_id = sign_id);
      this.setState({
        activityList: participants,
        signType: signType
      })
    }
  }


  // 进入报名页
  toEntryForm = debounceFn(() => {
    const { signType } = this.state
    if (signType > 0) {
      navigate(`${routes.entryForm}?sid=${this.sign_id}`)
    } 
  }, 1000)

  // 进入投票详情页
  toVoteDetails = debounceFn((e: IParticipant) => {
    transfer.params = e
    navigate(routes.voteDetails)
  }, 1000)

  render() {
    const { activityList } = this.state
    return (
      <View className='activity'>
        <ScrollView
          className='act-wrap'
          scrollY
          style={{height: CSSRemainHeight(0, false)}}
        >
          {activityList.length > 0 && activityList.map((e, i) => {
            return <View
              key={`${e.player_id}-${i}`}
              className='act-card'
              onClick={() => this.toVoteDetails(e)}
            >
              <Text>{getLang().activity_name}：{e.name}</Text>
              <Text>{getLang().activity_poll}：{e.poll}</Text>
              <View
                className='act-card-vote flex'
                onClick = {
                  ev => {
                    ev.stopPropagation()
                    clickVote({
                      player_id: e.player_id,
                      act_id: this.activity_id
                    })
                  }
                }
              >
                <Text>{getLang().activity_vote}</Text>
              </View>
            </View>
          })}
          <View className='act-button-fake' />
        </ScrollView>
        <View className='act-button'>
          <View
            className='act-card-vote flex'
            onClick={() => this.toEntryForm()}
          >
            <Text>{getLang().activity_sign_up}</Text>
          </View>
        </View>
      </View>
    )
  }
}
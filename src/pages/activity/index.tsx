import React, { Component } from 'react'
import { getCurrentInstance } from '@tarojs/taro';
import { View, Text, ScrollView, Input } from '@tarojs/components';
import { getActivityAPI, IParticipant } from '@/api/activity';
import { debounceFn } from '@/util/debounce';
import { CSSRemainHeight, isH5, navigate, setTitle } from '@/util/system';
import { routes } from '@/config/routes';
import { getLang, clickVote } from './_util';
import transfer from '@/util/transfer';
import './index.less';
import { inject, observer } from 'mobx-react';

interface IState {
  act_name: string
  act_info: string
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
      act_name: '***',
      act_info: '***',
      activityList: [],
      signType: 0
    }
  }

  componentDidMount() {
    const { aid = '' } = getCurrentInstance().router!.params
    this.activity_id = aid
  }
  componentDidShow() {
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
      const {
        act_name,
        act_info,
        participants = [],
        sign_end
      } = data
      setTitle(act_name)
      this.setState({
        act_name,
        act_info,
        activityList: participants,
        signType: Number(Date.now() < sign_end)
      })
    }
  }

  // 进入报名页
  toEntryForm = debounceFn(() => {
    const { signType } = this.state
    if (signType > 0) {
      navigate(`${routes.entryForm}?aid=${this.activity_id}`)
    } 
  }, 1000)

  // 进入投票详情页
  toVoteDetails = debounceFn((e: IParticipant) => {
    transfer.params = e
    navigate(routes.voteDetails)
  }, 1000)

  render() {
    const {
      activityList,
      act_info,
      act_name,
      signType
    } = this.state
    return (
      <View className='activity'>
        <View className='act-header'>
          {isH5 && <Text className='act-header-title act-header-mt'>{act_name}</Text>}
          <Text className='act-header-info act-header-mt'>{act_info}</Text>
          {/* <View className='act-header-button' onClick={() => this.toEntryForm()}>{getLang().activity_sign_up}</View> */}
          <Input className='act-header-input act-header-mt' placeholder={'搜索候选人'} />
        </View>
        <View className='act-gap' />
        {activityList.length > 0 ? <ScrollView
          className='act-wrap'
          scrollY
          style={{height: CSSRemainHeight(225, false)}}
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
                    }, poll => {
                      this.setState({
                        activityList: this.state.activityList.map(
                          ({player_id}) => player_id === e.player_id ? {...e, poll} : e
                        )
                      })
                    })
                  }
                }
              >
                <Text>{getLang().activity_vote}</Text>
              </View>
            </View>
          })}
          <View className='act-button-fake' />
        </ScrollView> : <View
          style={{height: CSSRemainHeight(225, false)}}
          className='act-default'
        >
          <Text className='act-default-text'>暂无选手，快去报名吧~</Text>
        </View>}
        
        <View className='act-button'>
          {signType? <View
            className='act-card-vote flex'
            onClick={() => this.toEntryForm()}
          >
            <Text className='act-button-text'>{getLang().activity_sign_up}</Text>
          </View> : <View className='act-card-vote flex act-button-gray'>
            <Text className='act-button-text'>{'报名截止'}</Text>
          </View>}
        </View>
      </View>
    )
  }
}
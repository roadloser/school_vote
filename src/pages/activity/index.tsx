import React, { Component } from 'react'
import { getCurrentInstance } from '@tarojs/taro';
import { View, Text, ScrollView } from '@tarojs/components';
import { getActivityAPI, IParticipant, voteAPI } from '@/api/activity';
import './index.less';
import { debounceFn, debounceForClick } from '@/util/debounce';
import { CSSRemainHeight } from '@/util/system';
import { routes } from '@/config/routes';

interface IState {
  activityList: IParticipant[],  // 候选人
  signType: number  // 0: 报名截止 1:报名 2: 编辑报名
}
interface IProps {}
export default class Activity extends Component<IProps, IState> {
  activity_id: nstring  // 活动id
  sign_id: nstring  // 活动报名id
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
    const { code, data } = await getActivityAPI(this.activity_id) || {}
    if(code === 200) {
      const { actList, signType, sign_id } = data
      sign_id && (this.sign_id = sign_id);
      this.setState({
        activityList: actList,
        signType: signType
      })
    }
  }

  // 投票
  voteIt = debounceForClick({
    cb: async id => {
      const {code, data} = await voteAPI(id)
      if (code === 200) {
        Taro.showToast({title: 'ok'})
      }
    },
    waitFn: () => {
      Taro.showToast({title: '过会儿再投'})
    },
    delay: 2500
  })

  // 进入报名页
  toSignupForm = debounceFn(() => {
    const { signType } = this.state
    if (signType > 0) {
      Taro.navigateTo({
        url: `${routes.signupForm}?sid=${this.sign_id}`
      })
    } 
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
          {activityList.length > 0 && [...activityList,...activityList,...activityList].map((e, i) => {
            return <View
              key={`${e.participant_id}-${i}`}
              className='act-card'
            >
              <Text>姓名：{e.name}</Text>
              <Text>票数：{e.poll}</Text>
              <View
                className='act-card-vote'
                onClick={() => this.voteIt(e.participant_id)}
              >
                <Text>投票</Text>
              </View>
            </View>
          })}
          <View className='act-button-fake' />
        </ScrollView>
        <View className='act-button'>
          <View
            className='act-card-vote'
            onClick={() => this.toSignupForm()}
          >
            <Text>报名</Text>
          </View>
        </View>
      </View>
    )
  }
}
import React, { useReducer } from 'react'
import { View, Text, Input, Switch, Textarea, Picker } from '@tarojs/components';
import { Menu } from '@/components/Menu';
import './index.less'
import { enptyParams, navigateBack, showModal } from '@/util/system';
import { createActivityAPI } from '@/api/activity';

interface IProps {}
interface IState {
  allowShow: boolean
  act_name: string
  act_info: string
  act_end?: number
  sign_end?: number
  act_extends?: {
    vote_limit?: number | string[]
    limit_times?: number
    vote_myself?: boolean
  }
}

function myReducer (state, newState): IState {
  let obj = { ...state }
  let changed = false
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(newState, key)) {
      changed = true
      obj[key] = key === 'act_extends' ? {
        ...obj[key],
        ...newState[key]
      } : newState[key]
    }
  }
  return changed ? obj : state
}

const initialState = {
  allowShow: true,
  act_name: '',
  act_info: ''
}
export default function CreateActivity (props: IProps) {
  const [state, setState] = useReducer(myReducer, initialState);
  // 活动名
  const getActName = e => {
    setState({
      act_name: e.detail.value
    })
  }
  // 活动简介
  const getActInfo = e => {
    setState({
      act_info: e.detail.value
    })
  }
  // 展示状态
  const changeShowState = e => {
    setState({
      allowShow: e.detail.value
    })
  }
  // 提交
  const actSubmit = async() => {
    const errmsg = enptyParams({
      ...state,
      活动名: state.act_name
    })
    if (errmsg) {
      showModal(`缺少${errmsg}`)
      return
    }
    const { msg } = await createActivityAPI((state))
    showModal(msg)
    navigateBack()
  }

  return (
    <View className='act-wrap'>
      <Menu title='活动名称' content='必填项'>
        <Input
          className='act-input'
          value={state.act_name}
          onInput={getActName}
          placeholder={'请输入...'}
        />
      </Menu>
      <Menu title='活动简介'>
        <Textarea
          className='act-input'
          value={state.act_info}
          onInput={getActInfo}
          placeholder={'请输入...'}
        />
      </Menu>
      <Menu title='是否展示' content='必填项' bottom>
          <Switch checked={state.allowShow} onChange={changeShowState}/>
      </Menu>
      <View><Text className='act-extends-title'>其他信息</Text></View>
      <Menu title='投票截止'>
        <Input className='act-input' onInput={() => {}} placeholder={'选填，默认24h'} />
      </Menu>
      <Menu title='活动结束'>
        <Input className='act-input' onInput={() => {}} placeholder={'选填，默认24h'} />
        {/* <Picker mode='time'>
          <View className='picker' onChange={e => {}}>
                    当前选择：{this.state.timeSel}
          </View>
        <Picker/> */}
      </Menu>
      <Menu title='投票限制'>
        <Input className='act-input' onInput={() => {}} placeholder={'选填，默认无限制'} />
      </Menu>
      <Menu title='投票次数'>
        <Input className='act-input' onInput={() => {}} placeholder={'选填，默认1次'} />
      </Menu>
      <Menu title='能否自投' bottom>
        <Switch checked />
      </Menu>
      <View className='act-submit flex' onClick={actSubmit}>
        <Text>创建活动</Text>
      </View>
    </View>
  )
}
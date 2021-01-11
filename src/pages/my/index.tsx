import React, { Component } from 'react'
import { View, Text } from '@tarojs/components';
import './index.less';
import { Menu } from '@/components/Menu';

interface IState {}
interface IProps {}
export default class Index extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <View className='my'>
        <Menu title='我的' />
        <Menu title='我的UI' content='tips' />
        <Menu title='我的跳转' url='/pages/my/_my/vote_list/index' bottom />
      </View>
    )
  }
}
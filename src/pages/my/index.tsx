import React, { Component } from 'react'
import { View, Text } from '@tarojs/components';
import './index.less';
import { Menu } from '@/components/Menu';
import { routes } from '@/config/routes';

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
        <Menu title='活动发布' url={routes.activityCreate}/>
        <Menu title='查看已发布活动' adaptiveWidth url='#'/>
        <Menu title='权限赋予' url='#'/>
        <Menu title='我的信息' url='/pages/my/_my/vote_list/index' bottom/>
      </View>
    )
  }
}
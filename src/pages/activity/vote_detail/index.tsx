import React, { Component } from 'react'
import { View, Text } from '@tarojs/components';
import './index.less';

interface IState {}
interface IProps {}
export default class VoteDetail extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <View>
        <Text>投票详情</Text>
      </View>
    )
  }
}
import React, { Component } from 'react'
import { View, Input } from '@tarojs/components';
import './index.less';

interface IState {}
interface IProps {}
export default class Search extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <View>
         <Input type='text' placeholder='将会获取焦点' focus/>
      </View>
    )
  }
}
/*
 * @Descripttion: 
 * @version: 
 * @Author: roadloser
 * @Date: 2020-12-31 11:16:23
 * @LastEditors: roadloser
 * @LastEditTime: 2021-01-19 20:54:40
 */
import React, { Component } from 'react'
import { Provider } from 'mobx-react'

import store from './store'

import './app.less'

class App extends Component {
  componentDidMount () {
    // 支付宝阻止下拉刷新
    if (process.env.TARO_ENV === 'alipay') {
      my.setCanPullDown({
        canPullDown: false
      })
    }
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 就是要渲染的页面
  render () {
    return (
      <Provider {...store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App

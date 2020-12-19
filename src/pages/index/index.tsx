import React, { Component } from 'react'
import { View, Button, Text, Input } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import debounce from '@/util/debounce'

import './index.less'
import { CSSRemainHeight } from '@/util/system'

type PageStateProps = {
  store: {
    counterStore: {
      counter: number,
      increment: Function,
      decrement: Function,
      incrementAsync: Function
    }
  }
}

interface Index {
  props: PageStateProps;
}

@inject('store')
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      isShow: false,
      isFocus: false
    }
  }

  componentDidShow () {
    this.clearInput()
  }

  changeInput: any = debounce(({detail:{value}}) => {
    console.log(value)
    this.setState({
      inputValue: value,
      isFocus: true
    })
  }, 1000)

  clearInput = () => {
    this.setState({
      inputValue: '',
      isShow: false,
      isFocus: false
    })
  }

  render() {
    const { inputValue, isShow, isFocus } = this.state
    return (
      <View className='wrap'>
        { isShow && 
          <View className='i-wrap'>
            <View className='i-header'>
              <Input
                className='i-search'
                placeholder='搜索活动id/活动名称'
                onInput={ this.changeInput }
                focus={ isFocus }
              />
              {isFocus && <Text
                className='i-clear'
                onClick={this.clearInput}
              >取消</Text>}
            </View>
          </View>
        }
        {!isShow && 
          <View
            className='fake-wrap'
            style={{height: CSSRemainHeight(0)}}
          >
            <View className='fake-logo flex'><Text>SchoolVote</Text></View>
            <View
              className='fake-search'
              hoverClass='fake-search-hover'
              onClick={() => {
                this.setState({
                  isShow: true,
                  isFocus: true
                })
              }}
            ><Text>搜索活动id/活动名称</Text></View>
          </View>
        }
      </View>
    )
  }
}

export default Index

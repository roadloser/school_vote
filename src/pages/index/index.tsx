import React, { Component } from 'react'
import { View, Text, Input } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import debounce from '@/util/debounce'
import { ISearchResult, getSreachListAPI } from '@/api/index'
import './index.less'
import { CSSRemainHeight } from '@/util/system'
import { Menu } from '@/components/Menu'
import { timeFormat } from '@/util/format'
import { routes } from '@/config/routes'

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
  state: {
    inputValue: string,
    isShow: boolean,
    isFocus: boolean,
    searchList: ISearchResult[]
  }
}

@inject('store')
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      isShow: false,
      isFocus: false,
      searchList: []
    }
  }

  componentDidShow () {
    const {inputValue} = this.state
    !inputValue && this.setState({ isShow: false })
  }

  changeInput: () => void = debounce(async({detail:{value}}) => {
    const { data } = await  await getSreachListAPI(value) || {}
    const { searchList } = data || {}
    this.setState({
      inputValue: value,
      searchList: searchList
    })
  }, 500)

  clearInput = (deep = false) => {
    if (deep) {
      console.log('取消');
      
      this.setState({
        inputValue: '',
        isShow: false
      })
    }
    this.setState({
      isFocus: false
    })
  }

  render() {
    const { inputValue, searchList, isShow, isFocus } = this.state
    console.log('render');
    
    return (
      <View className='wrap'>
        {/* realPage */}
        { isShow && 
          <View className='i-wrap'>
            <View className='i-header'>
              <Input
                className='i-search'
                placeholder='搜索活动id/活动名称'
                onInput={ this.changeInput }
                focus={ isFocus }
                onBlur={() => this.clearInput()}
              />
              {inputValue && <Text
                className='i-clear'
                onClick={() => this.clearInput(true)}
              >取消</Text>}
            </View>
            {searchList.length > 0 &&
              searchList.map((e,i) => 
              <Menu
                key={`searchList-${i}`}
                title={e.act_name}
                bottom={i >= searchList.length - 1}
                content={`结束时间：${timeFormat(e.vote_time, 'yyyy-MM-dd hh:mm')}`}
                tips={`${Date.now() < e.vote_time ? '进行中' : '已结束'}`}
                url={`${routes.activity}?aid=${e.act_id}`}
              >
              </Menu>
            )}

          </View>
        }
        {/* fakePage */}
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

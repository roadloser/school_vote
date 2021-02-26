import React, { Component } from 'react'
import Taro from '@tarojs/taro';
import { View, Text, Input } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import debounce from '@/util/debounce'
import { ISearchResult, getSreachListAPI } from '@/api/index'
import './index.less'
import { CSSRemainHeight, isWeapp } from '@/util/system'
import { Menu } from '@/components/Menu'
import { timeFormat } from '@/util/format'
import { routes } from '@/config/routes'
import { getLang } from './_util'

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
    mounted: boolean
    searchList: ISearchResult[]
  }
}

@inject('user')
@observer
class Index extends Component {
  page:number = 1
  limit:number = 10
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      isShow: false,
      isFocus: false,
      mounted: !isWeapp,
      searchList: []
    }
  }

  componentDidMount() {
    // 首屏
    isWeapp && Taro.nextTick(() => {
      this.setState({
        mounted: true
      })
    })
  }

  componentDidShow () {
    const {inputValue} = this.state
    !inputValue && this.setState({ isShow: false })
  }

  changeInput: () => void = debounce(async({detail:{value}}) => {
    const { page, limit } = this
    const { data } = await getSreachListAPI({
      act_query: value,
      page,
      limit
    }) || {}
    this.setState({
      inputValue: value,
      searchList: data
    })
  }, 500)

  clearInput = (deep = false) => {
    if (deep) {
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
    const { inputValue, searchList, isShow, isFocus, mounted } = this.state
    
    return (
      <View className='wrap'>
        {/* realPage */}
        { mounted && isShow && 
          <View className='i-wrap'>
            <View className='i-header'>
              <Input
                className='i-search'
                placeholder={getLang('index').index_input_placeholder}  // 搜索活动id/活动名称
                onInput={ this.changeInput }
                focus={ isFocus }
                onBlur={() => this.clearInput()}
              />
              {inputValue && <Text
                className='i-clear'
                onClick={() => this.clearInput(true)}
              >{getLang('index').index_cancel}</Text>}
            </View>
            {searchList.length > 0 &&
              searchList.map((e,i) => 
              <Menu
                key={`searchList-${i}`}
                title={e.act_name}
                bottom={i >= searchList.length - 1}
                // 
                content={`${getLang().index_end_time}：${timeFormat(e.act_end, 'yyyy-MM-dd hh:mm')}`}
                tips={`${Date.now() < e.act_end ? getLang().index_button_type_doing : getLang().index_button_type_done}`}
                url={`${routes.activity}?aid=${e.id}`}
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
            <View className='fake-logo flex'><Text>{getLang().logo}</Text></View>
            <View
              className='fake-search'
              hoverClass='fake-search-hover'
              onClick={() => {
                this.setState({
                  isShow: true,
                  isFocus: true
                })
              }}
            ><Text>{getLang().input_placeholder}</Text></View>
          </View>
        }
      </View>
    )
  }
}

export default Index

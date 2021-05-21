import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView } from '@tarojs/components';
import './index.less';
import { ISearchResult, getSreachListAPI } from '@/api/index'
import { CSSRemainHeight, showModal } from '@/util/system';
import { getLang } from '@/lang/lang';
import { timeFormat } from '@/util/format';
import { Menu } from '@/components/Menu';
import { routes } from '@/config/routes';

interface IProps {}

export default function XXX (props: IProps) {
  const [searchList, setSearchList] = useState<ISearchResult[]>([])
  let [page, limit] = [1, 10]

  const getList = async() => {
    const {code = -1, msg = '', data} = await getSreachListAPI({
      page,
      limit,
      isMyCreated: true
    })
    code === 200 ? setSearchList(data) : showModal(msg)
  }

  useEffect(() => {
    getList()
  }, [])

  return searchList.length > 0 ?
    <ScrollView
      className='i-scrollview i-theme'
      scrollY
      style={{height: CSSRemainHeight(0)}}
    >
      {searchList.map((e, i) => 
        <Menu
          adaptiveWidth
          key={`searchList-${i}`}
          title={e.act_name}
          bottom={i >= searchList.length - 1}
          // 
          content={`${getLang('index').index_end_time}：${timeFormat(e.act_end, 'yyyy-MM-dd hh:mm')}`}
          tips={`${Date.now() < e.act_end ? getLang('index').index_button_type_doing : getLang('index').index_button_type_done}`}
          url={`${routes.activity}?aid=${e.id}`}
        >
        </Menu>
      )}
    </ScrollView> : <View
      className='i-default i-theme'
      style={{height: CSSRemainHeight(0)}}
    >
      <Text className='i-default-text'>快去发布活动吧~</Text>
    </View>
  
}
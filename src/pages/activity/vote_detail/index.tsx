import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components';
import './index.less';
import transfer from '@/util/transfer';
import { IParticipant } from '@/api/activity';
import { setTitle } from '@/util/system';
import LoginModal from '@/components/Modal/LoginModal';
interface IProps {}
interface IParams extends IParticipant {}
export default function VoteDetail (props: IProps) {
  const [detailMsg, setDetailMsg] = useState<IParams>()
  const {
    player_id = '***',
    name = '***',
    poll = 0
  } = detailMsg || {}

    // 获取详情
    const getDetails = useCallback(async(id) => {
      const {code = -1, data} = await {}
      if(code === 200) {
        setDetailMsg(data)
      }
    }, [])

  useEffect(() => {
    const { params: _params } = transfer
    const params = _params || {}
    // 缓存路线
    if(params.name) {
      console.log('123', params);
      
      const { name = '' } = params as IParams || {}
      setTitle(name)
      setDetailMsg(params)
      return
    }
    // 取接口
    if (params.actId) {
      console.log('213');
      getDetails(params.actId)
    }
  }, [])

  return <View className='flex'>
    {/* 参赛者信息 */}
    <View className='vote-detail-info'>
      <Text className='vote-detail-p-side'>id：{player_id}</Text>
      <View className='vote-detail-p-center' />
      <Text className='vote-detail-p-side'>{name}</Text>
    </View>
    <View className='vote-detail-line' />
    {/* 照片轮播 */}
    <Swiper
      className='vote-detail-swiper'
      vertical
      circular
      indicatorDots
      autoplay
      indicatorColor='#999'
      indicatorActiveColor='#333'
    >
      <SwiperItem>
        <View className='vote-detail-swiper-item'></View>
      </SwiperItem>
    </Swiper>
    {/* <LoginModal/> */}
  </View>
}
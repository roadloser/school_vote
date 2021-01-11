import React, { useState, useEffect, useCallback } from 'react'
import { View, Text } from '@tarojs/components';
import './index.less';
import transfer from '@/util/transfer';
import { IParticipant } from '@/api/activity';
import { setTitle } from '@/util/system';
type nstring = number | string
interface IProps {}
export default function VoteDetail (props: IProps) {
  const [detailId, setDetailId] = useState<nstring>('')
  const [detailMsg, setDetailMsg] = useState<any>()

  // 获取详情
  const getDetails = useCallback(async() => {
    const {code = -1, data} = await {}
    if(code === 200) {
      setDetailMsg(data)
    }
  }, [detailId])

  useEffect(() => {
    setTitle('投票详情')
    const { params } = transfer
    const { participant_id } = params as IParticipant || {}
    setDetailId(participant_id)
    getDetails()
  }, [])

  return <View>
    <Text>投票详情</Text>
  </View>
}
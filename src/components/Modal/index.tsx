import React from 'react'
import { View } from '@tarojs/components';
import { CSSRemainHeight } from '@/util/system';
import './index.less';

interface IProps {
  onlyShadow?: boolean
  children?: React.ReactNode
}
export default function Modal (props: IProps) {
  const { onlyShadow } = props
  return  <View className='modal-wrap' style={{ height: CSSRemainHeight(0) }}>
    {!onlyShadow ?
      <View className='modal'>
        {props.children}
      </View> : <View />
    }
  </View>
}
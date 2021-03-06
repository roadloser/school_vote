import React, { CSSProperties } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components';
import defImage from '@/assets/img/common/icon_right.png'
import './index.less';

interface IProps {
  title: string
  content?: string
  adaptiveWidth?: boolean  // 自适应title宽度
  tips?: string
  url?: string
  icon?: string
  bottom?: boolean
  onClick?: Function
  children?: React.ReactNode
}

export const Menu = (props: IProps) => {
  const {
    title = '',
    adaptiveWidth = false,
    content = '',
    tips = '',
    url = '',
    icon = defImage,
    bottom = false,
    onClick
  } = props

  const menuStyle: CSSProperties = {}
  bottom && (menuStyle.borderBottomWidth = '0')

  const navigateTo = () => {
    onClick && onClick();
    url && Taro.navigateTo({ url })
  }

  return (
    <View
      className='menu'
      style={ menuStyle }
      onClick={ navigateTo }
    >
      <View className='menu-wrap'>
        <View className=''>
          <View className='menu-flex'>
            {adaptiveWidth ? <Text className='menu-title'>{title}</Text> : <Text
              className='menu-title menu-title-width'>{title}</Text>}
            {props.children}
          </View>
          {Boolean(content) && <View className='menu-content'><Text>{content}</Text></View>}
        </View>
        <View className='menu-flex'>
          {Boolean(tips) && <Text className='menu-content'>{tips}</Text>}
          {Boolean(url) && <Image className='menu-icon' src={ icon } />}
        </View>
      </View>
    </View>
  )
}
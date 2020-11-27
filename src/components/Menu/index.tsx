import React, { CSSProperties } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components';
import './index.less';

interface IProps {
  title: string
  content?: string
  url?: string
  icon?: string
  bottom?: boolean
}

export const Menu = (props: IProps) => {
  const {
    title,
    content,
    url,
    icon = '',
    bottom
  } = props
  const menuStyle: CSSProperties = {}
  bottom && (menuStyle.borderBottomStyle = 'solid')

  const navigateTo = () => {
    url && Taro.navigateTo({ url })
  }

  return (
    <View className='menu' onClick={navigateTo} hoverClass={`${Boolean(url)? 'menu-hover': ''}`} style={menuStyle}>
      <View className='menu-wrap'>
        <View>
          <View className='menu-title'><Text>{title}</Text></View>
          {Boolean(content) && <View className='menu-content'><Text>{content}</Text></View>}
        </View>
        {
          Boolean(url) && Boolean(icon)
          ?<Image className='menu-icon' src={ icon } />
          :<Text>{Boolean(url) ? '>' : ''}</Text>
        }
      </View>
    </View>
  )
}
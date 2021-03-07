import React, { useState, useEffect } from 'react'
import { View, Text, Image, Input, Textarea } from '@tarojs/components';
import './index.less';
import user from '@/store/user';
import { getCurrentInstance } from '@tarojs/taro';
import { signupAPI } from '@/api/activity';
import { navigateBack, showModal } from '@/util/system';

interface IProps {}
export default function EntryForm (props: IProps) {
  const { name = '' } = user.userInfo
  // const [imageList, setImageList] = useState<any[]>([])
  const [username, setUsername] = useState<string>(name)
  const [playerInfo, setPlayerInfo] = useState<string>('投我一票吧~')

  const getName = e => setUsername(e.detail.value)
  const getInfo = e => setPlayerInfo(e.detail.value)

  const signup = async() => {
    const { params } = getCurrentInstance().router || { params: {} }
    const { msg, code } = await signupAPI({
      act_id: params.aid,
      signup_extends: {
        s_info: playerInfo
      }
    }) || {}
    showModal(msg)
    code === 200 && navigateBack()
  }

  useEffect(() => {
    if(!getCurrentInstance().router) {
      showModal('活动id获取失败')
    }
  }, [])

  return <View className='entry-form'>
    <View className='entry-form-container'>
      <View className='entry-form-p flex'>
        <Text className='entry-form-p-text'>姓名</Text>
        <Input className='entry-form-p-input' value={username} disabled={Boolean(name)} onInput={getName} placeholder={'请输入姓名'} />
      </View>
      <View className='entry-form-line' />
      <View className='entry-form-p flex'>
        <Text className='entry-form-p-text'>简介</Text>
        <Textarea className='entry-form-p-textarea' value={playerInfo} onInput={getInfo} placeholder={'简介'} />
      </View>
      <View className='entry-form-line' />
      {/* <View className='entry-form-p'>
        <Text className='entry-form-p-text'>图片上传</Text>
        <View className='entry-form-p-image-list'>
          <View className='entry-form-p-image-item'>
            <Image className='entry-form-p-image' src='' />
          </View>
          {imageList.length && imageList.map((item, i) => {
            return (
              <View
                className='entry-form-p-image-item'
                key={`entry-form-p-image-item-${i}`}
              >
                <Image className='entry-form-p-image' src={item.url} />
              </View>
            )
          })}
        </View>
      </View>
      <View className='entry-form-line' /> */}
      <View className='entry-form-submit flex' onClick={signup}>
        <Text>提交报名</Text>
      </View>
    </View>
  </View>
}
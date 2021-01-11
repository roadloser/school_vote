import React, { useState, useEffect } from 'react'
import { View, Text, Image, Input, Textarea } from '@tarojs/components';
import './index.less';

interface IProps {}
export default function EntryForm (props: IProps) {
  const [imageList, setImageList] = useState<any[]>([])

  useEffect(() => {
    
  }, [])

  return <View className='entry-form'>
    <View className='entry-form-container'>
      <View className='entry-form-p flex'>
        <Text className='entry-form-p-text'>姓名</Text>
        <Input className='entry-form-p-input' value={'路痴'} placeholder={'请输入姓名'} />
      </View>
      <View className='entry-form-line' />
      <View className='entry-form-p flex'>
        <Text className='entry-form-p-text'>简介</Text>
        <Textarea className='entry-form-p-textarea' value={'哈哈哈哈哈'} placeholder={'简介'} />
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
      <View className='entry-form-submit flex'>
        <Text>提交报名</Text>
      </View>
    </View>
  </View>
}
import React, { useState } from 'react'
import { View, Text, Input, Radio, RadioGroup, Label } from '@tarojs/components';
import './index.less'
import lang, { langPage } from '@/lang/lang';
import { debounceFn } from '@/util/debounce';
import { enptyParams, isH5, isWeapp, showModal } from '@/util/system';
import { loginAPI } from '@/api/login';
import user from '@/store/user';
import { navigateBack, setStorageSync } from '@tarojs/taro';
const getLang = (page: langPage = 'index') => lang.getLang(page)

interface IProps {}
export default function Login(props: IProps) {
  const [loginId, setLoginId] = useState('')
  const [pwd, setPwd] = useState('')
  const [loginType, setLoginType] = useState([{
    id: 1,
    value: '学号',
    status: isH5
  }, {
    id: 2,
    value: '微信号',
    status: isWeapp
  }, {
    id: 3,
    value: '支付宝号',
    status: process.env.TARO_ENV === 'alipay'
  }])

  const platform = loginType.filter(e => e.status)[0]

  // 单选
  const onRadio = event => {
    const id = Number(event.detail.value)
    setLoginType(loginType.map(e => {
      e.status = id === e.id
      return e
    }))
  }

  const changeLoginId = (e) => {
    setLoginId(e.detail.value)
  }

  const changePwd = (e) => {
    setPwd(e.detail.value)
  }

  // 登录
  const loginSubmit = debounceFn(async () => {
    let obj: any = {}
    switch (platform.id) {
      case 1: obj.user_id = loginId; break;
      case 2: obj.weapp_id = loginId; break;
      case 3: obj.alipay_id = loginId; break;
    }
    if (pwd) obj.pwd = pwd
    const errMsg = enptyParams(obj)
    const {
      code = -1, msg, data = {}
    } = errMsg ? {
      msg: '缺少' + errMsg
    } : await loginAPI(obj)
    await showModal(msg)
    if (code === 200) {
      const { token, user_info } = data
      setStorageSync('token', token)
      user.setToken(token)
      user.setLogin(true)
      user.setUserInfo(user_info)
      navigateBack()
    }
  }, 1000)
  
  return (
    <View className='login'>
      <Text className='login-title'>{ getLang('index').logo }</Text>
      <View className='login-p flex'>
        <Text className='login-p-text'>{platform.value}</Text>
        <Input className='login-p-input' onInput={changeLoginId} placeholder={'请输入' + platform.value} />
      </View>
      <View className='login-line' />
      <View className='login-p flex'>
        <Text className='login-p-text'>密码</Text>
        <Input className='login-p-input' password onInput={changePwd} placeholder={'请输入密码'} />
      </View>
      <View className='login-line' />
      <RadioGroup className='login-p login-radioGroup flex' onChange={onRadio}>
        {loginType.map(e => <Label className='login-label flex'>
          <Radio
            value={e.id}
            checked={e.status}
          />
          <Text>{e.value}</Text>
        </Label>)}
      </RadioGroup>
      <View className='login-submit flex' onClick={loginSubmit}>
        <Text>登录</Text>
      </View>
    </View>
  )
}
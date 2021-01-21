import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react';
import { View, Text } from '@tarojs/components';
import Modal from '.';

interface IProps {
  user?: any
  children?: React.ReactNode
}
const LoginModal = (props: IProps) => {
  const { user } = props
  const [isLogin, setLogin] = useState(user.isLogin)

  // 若没登录，则判断环境
  switch (process.env.TARO_ENV) {
    case 'weapp':
       // 微信小程序先获取对应权限
       // 若no，open权限

       // 若没绑定学号，则跳转绑定学号界面
       
       break;
       
    case 'alipay':
        // 支付宝小程序先获取对应权限
        // 若no，open权限
        
        // 若没绑定学号，则跳转绑定学号界面

      break;
  
    case 'h5':
       // 跳转登录界面
      
      break;
  }
  
  useEffect(() => {
    user.setLogin.call(user, isLogin)
  }, [isLogin])
  return <View>
    {isLogin ? props.children : (
      <Modal>
        <Text>{String(isLogin)}</Text>
      </Modal>
    )}
  </View>
}
export default inject('user')(observer(LoginModal))

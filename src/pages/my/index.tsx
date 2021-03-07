import React, { useState, useEffect } from 'react'
import { ScrollView, View } from '@tarojs/components';
import './index.less';
import { Menu } from '@/components/Menu';
import { routes } from '@/config/routes';
import { CSSRemainHeight, navigate } from '@/util/system';
import { clearStorageSync, showToast, useDidShow } from '@tarojs/taro';
import user from '@/store/user';

interface IProps {}
export default function My (props: IProps) {
  const [level, setLevel] = useState(0)
  useDidShow(() => {
    const { level } = user.userInfo
    setLevel(level)
    if (!user.isLogin) {
      showToast({title: '请登录', icon: 'none', mask: true})
      setTimeout(()=>navigate(routes.login), 1000)
    }
  })

  const claar = () => {
    clearStorageSync()
    user.setToken('')
    user.setLogin(false)
    showToast({ title: '已清除缓存' })
  }

  return (
    <View className='my' style={{height: CSSRemainHeight(0)}}>
      {level && <Menu title='活动发布' url={routes.activityCreate}/>}
      {level && <Menu title='查看已发布活动' adaptiveWidth url='#'/>}
      {level > 1 && <Menu title='权限赋予' url='#'/>}
      <Menu title='我的信息' url='/pages/my/_my/vote_list/index'/>
      <Menu title='清除缓存' onClick={claar} bottom/>
    </View>
  )
}
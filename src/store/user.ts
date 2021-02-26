/*
 * @Descripttion: 
 * @version: 
 * @Author: roadloser
 * @Date: 2021-01-19 11:16:58
 * @LastEditors: roadloser
 * @LastEditTime: 2021-02-26 21:52:52
 */
import { getUserInfo } from '@/api/api_user';
import { action, observable } from 'mobx'

class User {
  @observable userInfo = {}
  @observable isLogin = false
  @observable token = ''
  @action setToken (newToken) {
    this.token = newToken
  }
  @action setLogin (status: boolean) {
    this.isLogin = status
  }
  @action async setUserInfo(userInfo?) {
    if (userInfo) {
      this.userInfo = {...this.userInfo, ...userInfo}
      return
    } 
    try {
      const {code = -1, data} = await getUserInfo()
      if (code === 200) {
        this.userInfo = {...this.userInfo, ...data}
      }
    } catch (e) {
      console.error(`user err: ${e}`);
    }
  }
}

export default new User()
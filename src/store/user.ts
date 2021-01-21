/*
 * @Descripttion: 
 * @version: 
 * @Author: roadloser
 * @Date: 2021-01-19 11:16:58
 * @LastEditors: roadloser
 * @LastEditTime: 2021-01-19 21:21:49
 */
import { getUserInfo } from '@/api/api_user';
import { action, observable } from 'mobx'

class User {
  @observable userInfo = {}
  @observable isLogin = false
  @action setLogin (status: boolean) {
    this.isLogin = status
  }
  @action async setUserInfo() {
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
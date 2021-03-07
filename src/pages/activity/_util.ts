/*
* @Author: roadloser
* @Date: 2020-12-31 14:12:13
 * @LastEditors: roadloser
 * @LastEditTime: 2021-03-07 05:58:22
*/
import Taro from '@tarojs/taro';
import { voteAPI } from "@/api/activity"
import { getLang as getlang, langPage } from "@/lang/lang"
import { debounceForClick } from "@/util/debounce"

export const getLang = (p: langPage = 'activity') => getlang(p)

export const clickVote = debounceForClick({
  cb: async (opt, callback?: Function) => {
    const {code, msg, data} = await voteAPI(opt)
    if (code) {
      Taro.showToast({
        title: msg,
        icon: code === 200 ? 'success' : 'none'
      })
      code === 200 && callback && callback(data)
    }
  },
  waitFn: () => {
    Taro.showToast({
      title: getLang().activity_vote_debounce,
      icon: 'none'
    })
  },
  delay: 2500
})

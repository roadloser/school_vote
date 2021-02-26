/*
 * @Author: roadloser
 * @Date: 2020-12-31 14:12:13
 * @LastEditors: roadloser
 * @LastEditTime: 2021-02-27 01:36:56
 */
import Taro from '@tarojs/taro';
import { voteAPI } from "@/api/activity"
import { getLang as getlang, langPage } from "@/lang/lang"
import { debounceForClick } from "@/util/debounce"

export const getLang = (p: langPage = 'activity') => getlang(p)

export const clickVote = debounceForClick({
  cb: async opt => {
    const {code, msg} = await voteAPI(opt)
    if (code) {
      Taro.showToast({
        title: msg,
        icon: code === 200 ? 'success' : 'none'
      })
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

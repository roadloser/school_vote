/*
 * @Author: roadloser
 * @Date: 2020-12-31 14:12:13
 * @LastEditors: roadloser
 * @LastEditTime: 2021-01-03 23:50:23
 */
import Taro from '@tarojs/taro';
import { voteAPI } from "@/api/activity"
import { getLang as getlang, langPage } from "@/lang/lang"
import { debounceForClick } from "@/util/debounce"

export const getLang = (p: langPage = 'activity') => getlang(p)

export const clickVote = debounceForClick({
  cb: async id => {
    const {code, data} = await voteAPI(id)
    if (code === 200) {
      Taro.showToast({title: 'ok'})
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

/*
 * @Author: roadloser
 * @Date: 2020-12-31 14:46:19
 * @LastEditors: roadloser
 * @LastEditTime: 2021-01-03 17:55:53
 */
import langPackage from "@/lang/langPackage";
import { ILangObj } from "./_i";
type resLangObj = {  // 不知道ts怎么约束
  [k: string]: string
}
export type langPage = keyof ILangObj

const langObjStore = new Map()

export function getLang(page: langPage): resLangObj {
  if (langObjStore.has(page)) {
    return langObjStore.get(page)
  }
  // 假如langPackage需要请求网络
  const langObj = (langPackage && langPackage[page]) || {}
  const langObjRes = {
    ...langPackage.common,
    ...langObj
  }
  // 缓存
  langObjStore.set(page, langObjRes)
  return langObjRes
}
export default {
  getLang
}
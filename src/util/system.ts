/*
 * @Author: roadloser
 * @Date: 2020-12-03 17:47:32
 * @LastEditors: roadloser
 * @LastEditTime: 2020-12-06 19:43:57
 */
import Taro from '@tarojs/taro'

export const isH5 = process.env.TARO_ENV === 'h5'
export const isRn = process.env.TARO_ENV === 'rn'

export function getSystemInfo(): Promise<Taro.getSystemInfo.Result | null> {
  return new Promise(resolve => {
    Taro.getSystemInfo({
      success: res => resolve(res),
      fail: () => resolve(null)
    })
  })
}

export function getSystemInfoSync() {
  return Taro.getSystemInfoSync()
}

/**
 * iphone 6 下宽度的实际像素
 * @param {number} rpx rpx
 * @returns {number} 像素
 */
export function W_PX(rpx: number) {
  return getSystemInfoSync().windowWidth * rpx / 750
}

/** 
 * iphone 6 下高度的实际像素
 * @param {number} i6px
 * @returns {number} 像素
 */
export function H_PX(i6px: number) {
  return getSystemInfoSync().windowHeight * i6px / 667
}

export const pxCSS: (val:number) => string|number = px => {
  switch (process.env.TARO_ENV) {
    case 'rn': return px
    case 'h5': return px + 'px'
    default:  return `${750/Taro.getSystemInfoSync().windowWidth*px}rpx`
  }
}

/**
 * 获取页面剩余高度, 适配4端
 * @param {number} exceptHeight 除了高度
 * @param {boolean} tabBar 是否包含底部导航栏，默认true
 * @param {boolean} containStatusBar 是否包含状态栏，默认false
 * @returns {string} 剩余高度
 */
export const CSSRemainHeight = (exceptHeight: number, tabBar = true, containStatusBar = false) => {
  if (isRn) return '100%'
  const statusBar = containStatusBar && !isH5 ?
    getSystemInfoSync().statusBarHeight : 0
  const tabBarHeight = tabBar && isH5 ? 53 : 0
  return `${ getSystemInfoSync().windowHeight - tabBarHeight - statusBar - exceptHeight }px`
}



/*
 * @Descripttion: 中转
 * @Author: roadloser
 * @Date: 2021-01-11 21:02:54
 * @LastEditors: roadloser
 * @LastEditTime: 2021-01-19 20:39:36
 */

import clone from "./clone"

export class Transfer {
  private static instance: Transfer
  private _data: any = null
  get params () {
    const data = clone(this._data)
    this._data = null
    return data
  }
  set params (params) {
    this._data = params
  }

  public static getInstance(): Transfer {
    if (process.env.TARO_ENV === 'alipay') {
      if (!my.Transfer) {
        my.Transfer = new Transfer()
      }
      return my.Transfer
    }
    if (!Transfer.instance) {
      Transfer.instance = new Transfer()
    }
    return Transfer.instance
  }
}
export default Transfer.getInstance()
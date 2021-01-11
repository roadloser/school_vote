/*
 * @Descripttion: 常用的克隆函数
 * @Author: roadloser
 * @Date: 2021-01-11 21:15:30
 * @LastEditors: roadloser
 * @LastEditTime: 2021-01-11 22:06:11
 */
function commonClones <T> (data: T, deep = true): T {
  switch (typeof data) {
    case 'object': 
      // @ts-ignore
      const type: T = Array.isArray(data) ? [] : {}
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const element = data[key]
          type[key] = deep ? commonClones(element) : element
        }
      }
      return type
    default: return data
  }
}


export default commonClones
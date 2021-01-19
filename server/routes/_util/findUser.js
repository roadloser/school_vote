/*
 * @Descripttion: findUser
 * @Author: roadloser
 * @Date: 2021-01-25 13:56:13
 * @LastEditors: roadloser
 * @LastEditTime: 2021-01-26 18:22:22
 */
const Platform = require('../../models/Platform')
const { getToken } = require('./token')
const { isNullObj } = require('./util')

/**
 * @return {
 *  type, 【0/null】ok |【1】 有id没user_id | 【2】id null | 【3】没token | 【4】 sql err | 【5】 token与传入不一样
 *  user_id?,
 *  err?
 * }
 */
module.exports = async (params = null) => {
  try {
    const ids = params || await getToken(global.token)
    const { user_id = '', weapp_id = '', alipay_id = '' } = ids
    if (user_id) {
      return { user_id }
    }
    try {
      if (weapp_id) {
        const weappRes = await Platform.findAll({
          where: { weapp_id: weapp_id },
          attributes: ['user_id', 'id']
        })
        const { user_id: wid, id } = (weappRes && weappRes[0]) || {}
        return wid ? {
          user_id: wid,
          id
        } : id ? {
          user_id: wid,
          id,
          type: 1
        } : { type: 2 }
      }
      if (alipay_id) {
        const aliRes = await Platform.findAll({
          where: { alipay_id: alipay_id },
          attributes: ['user_id', 'id']
        })
        const { user_id: aid, id: _id } = (aliRes && aliRes[0]) || {}
        return aid ? {
          user_id: aid,
          id: _id
        } : _id ? {
          user_id: aid,
          id: _id,
          type: 1
        } : { type: 2 }
      }
    } catch (err) {
      console.log('sql err', err)
      if (isNullObj(err)) return { type: 2, err }
      return { type: 4, err }
    }
  } catch (err) {
    return { type: 3, err }
  }
}


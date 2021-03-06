/*
 * @Descripttion: findUser
 * @Author: roadloser
 * @Date: 2021-01-25 13:56:13
 * @LastEditors: roadloser
 * @LastEditTime: 2021-03-06 18:04:38
 */
const Platform = require('../../models/Platform')
const { getToken } = require('./token')
const { isNullObj } = require('./util')

/**
 * @return {
 *  type, 【0/null】ok |【1】 有id但无user_id | 【2】id/user_id 都无 | 【3】没token/token与传入不一样 | 【4】 sql err 
 *  user_id?,
 *  err?
 * }
 */
module.exports = async (params = null, isStrict = false) => {
  try {
    const ids = typeof params === 'string' ? getToken(params) : params
    const { user_id = '', weapp_id = '', alipay_id = '', token_id = '' } = ids
    if (token_id) return { id: token_id, user_id }
    try {
      if (user_id) {
        if (isStrict) {
          const result = await Platform.findAll({
            where: { user_id: user_id },
            attributes: ['user_id', 'id']
          })
          const { user_id: uid, id: u_id } = (result && result[0]) || {}
          return uid === user_id ? { id: u_id, user_id } : { type: 2 }
        }
        return { user_id }
      }
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
    console.log('findUser---', err)
    return { type: 3, err }
  }
}


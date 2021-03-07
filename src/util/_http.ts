/*
 * @Author: roadloser
 * @Description: 封装ajax
 * @Date: 2021-02-26 17:54:00
 * @LastEditors: roadloser
 * @LastEditTime: 2021-03-07 05:36:02
 */
import user from '@/store/user';
import Taro from '@tarojs/taro';
import {
  hostAddress, routes
} from '../config/routes';
import {
  isH5, navigate
} from './system';

export const httpStatus = {
  // token
  token_err: 401000,  // token过期

  // common
  common_no_exist: 403001,  // xx不存在
  common_exist: 403002,  // xx已存在

  // user
  user_pwd_err: 403101,  // 密码有误
  user_no_permission: 403102,  // 用户无权限
  
  // 传参有误
  null_exist: 400100,  // 重要参数未传
  validation_failed: 400101,  // 所传参数验证失败
}

// 不想在config/index设置proxy
function ajaxH5(opt) {
  return new Promise((resolve, reject) => {
    let xmlHttp
    if (XMLHttpRequest) {
      xmlHttp = new XMLHttpRequest();
    } else {
      xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
    }
    // xml open方式
    if (opt.method.toUpperCase() === 'POST') {
      xmlHttp.open(opt.method, opt.url)
    }
    else if (opt.method.toUpperCase() === 'GET') {
      let params: string[] = [];
      for (const key in opt.data) {
        params.push(key + '=' + opt.data[key]);
      }
      let postData = params.join('&');
      xmlHttp.open(opt.method, opt.url + '?' + postData)
    }
    // xml header
    for (const headerKey in opt.header) {
      xmlHttp.setRequestHeader(headerKey, opt.header[headerKey]);
    }
    xmlHttp.send(opt.method.toUpperCase() === 'POST' ? (
        opt.header['Content-Type'].indexOf('application/json') > -1 ? JSON.stringify(opt.data) : opt.data
      ) : null);
    xmlHttp.onreadystatechange = function () {
      // 响应成功的函数
      if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 200) {
          let response;
          if (opt.dataType === 'json' || opt.dataType === 'text') {
            if (opt.dataType === 'json') {
              //解析json数据
              response = JSON.parse(xmlHttp.responseText);
            } else {
              //普通数据
              response = xmlHttp.responseText;
            }
          } else {
            response = xmlHttp.responseXML;
          }
          resolve(response);
        } else if (xmlHttp.status === 0) {
          reject(xmlHttp)
        }

      }

    }
  })
}

async function ajaxFn(opt) {
  const {
    host,
    port
  } = hostAddress
  let obj = {
    ...opt
  }
  const {
    url = '', header = {}
  } = opt
  obj.dataType = opt.dataType || 'json'
  obj.mode = 'cors'
  obj.url = url.startsWith('/api') ? url.replace('/api', `${host}:${port}`) : url
  // obj.header["Content-Type"] = header["Content-Type"] || `application/${opt.method === 'GET' ? 'json' : 'x-www-form-urlencoded'}`
  obj.header["Content-Type"] = header["Content-Type"] || "application/json"
  if (user.token) {
    obj.header["Authorization"] = user.token
  }

  if (isH5) {
    return ajaxH5(obj)
  }

  const {
    data
  } = await Taro.request(obj)
  return data
}

export const ajaxPost = (url = '', data = {}, header = {}, opt = {}) => {
  const obj = {
    method: "POST",
    url,
    data,
    header,
    ...opt
  }
  return interceptor(obj)
}

export const ajaxGet = (url = '', data = {}, header = {}, opt = {}) => {
  const obj = {
    method: "GET",
    url,
    data,
    header,
    ...opt
  }
  return interceptor(obj)
}

async function interceptor (obj) {
  const res = await ajaxFn(obj)
  if (res.code === httpStatus.token_err) {
    await Taro.showToast({ title: res.msg })
    await setTimeout(() => navigate(routes.login), 1500)
  }
  return res
}

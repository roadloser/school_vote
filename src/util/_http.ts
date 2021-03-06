/*
 * @Author: roadloser
 * @Description: 封装ajax
 * @Date: 2021-02-26 17:54:00
 * @LastEditors: roadloser
 * @LastEditTime: 2021-03-07 00:56:27
 */
import user from '@/store/user';
import Taro from '@tarojs/taro';
import {
  hostAddress
} from '../config/routes';
import {
  isH5
} from './system';

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
  return ajaxFn(obj)
}

export const ajaxGet = (url = '', data = {}, header = {}, opt = {}) => {
  const obj = {
    method: "GET",
    url,
    data,
    header,
    ...opt
  }
  return ajaxFn(obj)
}

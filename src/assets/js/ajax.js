import axios from 'axios';

let qs = require('qs')

axios.defaults.timeout = 10000;
axios.defaults.baseURL = '';
axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.delete['Content-Type'] = 'application/x-www-form-urlencoded'
axios.interceptors.request.use(
  config => {
    let url = config.url
    // get参数编码
    if(!url) {
      return false;
    }
    url.indexOf('?') === -1 ? url += '?token=' + localStorage.getItem('token') : url += '&token=' + localStorage.getItem('token')
    if (config.method === 'get' && config.params) {
      url += '&'
      let keys = Object.keys(config.params)
      for (let key of keys) {
        url += `${key}=${encodeURIComponent(config.params[key])}&`
      }
      url = url.substring(0, url.length - 1)
      // config.params = {}
    }
    config.url = url
    
    return config
})



function serialize(args){
  return qs.stringify(args, { arrayFormat: 'repeat' })
}

function adaAJAX(method, url, params){
  if (!params) {
    params = {}
  }
  // 传参时加入用户的token
  // params.token = localStorage.getItem('token')
  return new Promise((resolve, reject) => {
    let data = null
    if('get'===method || 'delete'===method){
      data = { params }
      if(params.repeatArray){
        data.paramsSerializer = serialize
      }
    }else{
      data = params.repeatArray?serialize(params): qs.stringify(params)
    }
    axios[method](url, data)
    .then( r => {
      let d = r.data
      if(d.status === 0 || params === 1){
        resolve(d)
      }else{
        reject(d.msg)
      }
    }).catch(err => {
      reject(err)
    })
  })
}

export function ajaxGET(url, params) {
  return adaAJAX('get', url, params)
}

export function ajaxPUT(url, data = {}) {
  return adaAJAX('put', url, data)
}

export function ajaxPOST(url, data = {}) {
  return adaAJAX('post', url, data)
}

export function ajaxDELETE(url, data = {}) {
  return adaAJAX('delete', url, data)
}


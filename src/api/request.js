import axios from 'axios'
import { showFailToast } from 'vant';
import Cookies from 'js-cookie'

const handleNetworkError = (errStatus) => {
  let errMessage = '未知错误'
  if (errStatus) {
      switch (errStatus) {
          case 400:
              errMessage = '错误的请求'
              break
          case 401:
              errMessage = '未授权，请重新登录'
              break
          case 403:
              errMessage = '拒绝访问'
              break
          case 404:
              errMessage = '请求错误,未找到该资源'
              break
          case 405:
              errMessage = '请求方法未允许'
              break
          case 408:
              errMessage = '请求超时'
              break
          case 500:
              errMessage = '服务器端出错'
              break
          case 501:
              errMessage = '网络未实现'
              break
          case 502:
              errMessage = '网络错误'
              break
          case 503:
              errMessage = '服务不可用'
              break
          case 504:
              errMessage = '网络超时'
              break
          case 505:
              errMessage = 'http版本不支持该请求'
              break
          default:
              errMessage = `其他连接错误 --${errStatus}`
      }
  } else {
      errMessage = `无法连接到服务器！`
  }

  showFailToast(errMessage)
}

if (import.meta.env.MODE === 'dev') {
  axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_API;
} else {
  axios.defaults.baseURL = `${location.protocol}//${location.hostname}:8091`
}

axios.interceptors.request.use((config) => {
  config.headers['token'] = Cookies.get('token')
	return config
})

axios.interceptors.response.use(
    (response) => {
        // 下载文件
        if (response.headers['content-type'].startsWith('text/plain')) {
          return response
        }
        if (response.status !== 200) return Promise.reject(response.data)


        const code = response.data.code
        if(code !== '000000') {
          showFailToast(response.data.memo)
          return Promise.reject(response.data)
        }
        return response.data
    },
    (err) => {
        handleNetworkError(err.response.status)
        Promise.reject(err.response)
    }
)

export const fetchGet = (url, params) =>
  new Promise((resolve) => {
    axios
      .get(url, { params })
      .then((result) => {
        let res = result
        resolve([null, res])
      })
      .catch((err) => {
        resolve([err, undefined])
      })
  })

export const fetchPost = (url, data, params) => {
  return new Promise((resolve) => {
    axios
      .post(url, data, { params })
      .then((result) => {
        let res = result
        resolve([null, res])
      })
      .catch((err) => {
        resolve([err, undefined])
      })
  })
}

const request = ({url, method, data, params}) => {
  if (method.toUpperCase() === 'GET') {
    return fetchGet(url, params)
  } else {
    return fetchPost(url, data, params)
  }
}

export default request
